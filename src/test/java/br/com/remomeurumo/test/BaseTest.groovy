package br.com.remomeurumo.test

import br.com.remomeurumo.JerseyConfig
import br.com.remomeurumo.persistence.EntityManagerProducer
import br.com.remomeurumo.persistence.TransactionalEntityManager
import groovy.json.JsonSlurper
import org.glassfish.jersey.test.JerseyTest
import org.jboss.weld.context.RequestContext
import org.jboss.weld.context.unbound.UnboundLiteral
import org.jboss.weld.environment.se.Weld
import org.jboss.weld.environment.se.WeldContainer
import org.junit.BeforeClass

import javax.persistence.EntityManagerFactory
import javax.ws.rs.core.Application
import javax.ws.rs.core.Response

import static org.junit.Assert.*


/**
 * @author bbviana
 */
abstract class BaseTest extends JerseyTest {

    // JerseyTest possui um metodo getProperty que faz o Groovy se confundir se tentarmos acessar variaveis de BaseTest
    // Por ex, se fizermos this.em, tomamos um IllegalAccessException.
    // Melhor acessar essas variáveis por getters (que devem ser protected).

    private TransactionalEntityManager em

    private Weld weld

    private WeldContainer weldContainer

    @BeforeClass
    static void setTestEnviroment() {
        println "Definindo 'enviroment = test' na JVM para usarmos o banco de testes..."
        System.setProperty("enviroment", "test")
    }


    @Override
    void setUp() throws Exception {
        println "Ativando contêiner Weld..."
        weld = new Weld()
        weldContainer = weld.initialize()

        em = weldContainer.instance().select(TransactionalEntityManager).get()
        super.setUp()
    }

    @Override
    protected Application configure() {
        return new JerseyConfig()
    }

    @Override
    void tearDown() throws Exception {
        println "Desligando contêiner Weld..."
        weld.shutdown()

        super.tearDown()
    }

    protected TransactionalEntityManager em() {
        return em
    }

    ////////////////////////////////////////////////////////////////////////////////
    // DB Access
    ////////////////////////////////////////////////////////////////////////////////

    protected static void cleanDataBase() {
        println "Limpando Database..."
        EntityManagerProducer.clearEntityManagerFactory()
    }
    private void activateRequestScoped() {
        println "Ativando 'RequestContext' para permitir o uso de @RequestScoped..."
        RequestContext requestContext = weldContainer.instance().select(RequestContext, UnboundLiteral.INSTANCE).get();
        requestContext.activate();
    }

    private void deactivateRequestScoped() {
        println "Desativando 'RequestContext' ..."
        RequestContext requestContext = weldContainer.instance().select(RequestContext, UnboundLiteral.INSTANCE).get();
        requestContext.deactivate();
    }

    protected <T> List<T> populate(Class<T> entityClass, List templates) {
        activateRequestScoped()
        // por algum motivo precisamos de um variavel local para fechar o escopo da closure
        def entities = templates.collect {
            def entity = entityClass.newInstance(it)
            em().persist(entity)
            return entity
        }

        deactivateRequestScoped()
        return entities
    }

    protected <T> T populate(Class<T> entityClass, Map template) {
        return populate(entityClass, [template])[0]
    }

    protected <T> List<? extends T> findAll(Class<T> clazz) {
        activateRequestScoped()
        def list = em.createQuery("FROM ${clazz.name} e").getResultList()
        deactivateRequestScoped()
        return list
    }

    protected <T> T find(Class<T> clazz, Object id) {
        activateRequestScoped()
        T entity = em.find(clazz, id)
        deactivateRequestScoped()
        return entity
    }

    ////////////////////////////////////////////////////////////////////////////////
    // TEST UTILS
    ////////////////////////////////////////////////////////////////////////////////

    protected <T> T instance(Class<T> clazz) {
        return weldContainer.instance().select(clazz).get()
    }

    /**
     * Em Groovy da pra usar inputStream.text
     */
    protected static String streamToString(InputStream is) {
        Scanner s = new Scanner(is).useDelimiter("\\A");
        return s.hasNext() ? s.next() : "";
    }

    protected static <T> T toJson(Response response) {
        String text = response.entity.text
        return (T) new JsonSlurper().parseText(text)
    }

    @SuppressWarnings("GroovyAssignabilityCheck")
    static void compare(def bean, Map template) {
        if (bean == null) {
            fail "Null Object"
        }
        template.forEach { String name, value ->
            if (value instanceof Double || value instanceof BigDecimal) {
                assertEquals(value as Double, bean[name] as Double, 0d)
            } else if (value.getClass().isArray()) {
                assertTrue(Arrays.equals(value, bean[name]))
            } else {
                assertEquals(value, bean[name])
            }
        }
    }

    static void compare(List beans, List templates) {
        assertEquals "Listas possuem tamanhos diferentes", beans.size(), templates.size()
        beans.eachWithIndex { bean, i -> compare(bean, templates[i] as Map) }
    }

    /**
     *  def map = [a: "A", b: "B"]
     *  def filtered = map.findAll(except("a"))
     *  assert filtered == [b: "B"]
     */
    static Closure except(String... keysToIgnore) {
        return { entry -> return !keysToIgnore.contains(entry.key) }
    }

    static Date date(int day, int month, int year) {
        return new GregorianCalendar(year, month, day).getTime()
    }

}
