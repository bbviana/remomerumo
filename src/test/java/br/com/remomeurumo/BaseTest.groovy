package br.com.bbviana.laylamarques

import org.bson.types.ObjectId
import org.glassfish.jersey.test.JerseyTest
import org.jboss.weld.context.RequestContext
import org.jboss.weld.context.unbound.UnboundLiteral
import org.jboss.weld.environment.se.Weld
import org.jboss.weld.environment.se.WeldContainer
import org.junit.BeforeClass
import org.mongodb.morphia.Datastore

import javax.ws.rs.core.Application

import static org.junit.Assert.*

/**
 * @author bbviana
 */
abstract class BaseTest extends JerseyTest {

    private Datastore ds

    private Weld weld

    private WeldContainer weldContainer

    @Override
    void setUp() throws Exception {
        weld = new Weld()
        weldContainer = weld.initialize()

        ds = weldContainer.instance().select(Datastore).get()
        super.setUp()
    }

    // @RequestScoped
    protected void activateRequestScoped() {
        RequestContext requestContext = weldContainer.instance().select(RequestContext, UnboundLiteral.INSTANCE).get();
        requestContext.activate();
    }

    @Override
    void tearDown() throws Exception {
        cleanDataBase()

        println "Desligando Weld..."
        weld.shutdown()

        super.tearDown()
    }

    @Override
    protected Application configure() {
        return new JerseyConfig()
    }

    @BeforeClass
    static void startup() throws Exception {
        enableMongoLogging()
        setTestEnviroment()
    }

    private static void setTestEnviroment() {
        System.setProperty("enviroment", "test")
    }

    private static void enableMongoLogging() {
        // Enable MongoDB logging in general
        System.setProperty("DEBUG.MONGO", "true")
        // Enable DB operation tracing
        System.setProperty("DB.TRACE", "true")
    }

    private void cleanDataBase() {
        if (ds.getDB().getName().endsWith("-test")) {
            println "Limpando database..."
            ds.getDB().dropDatabase()
        }
    }

    Datastore getDatastore() {
        return ds
    }

    ////////////////////////////////////////////////////////////////////////////////
    // TEST UTILS
    ////////////////////////////////////////////////////////////////////////////////

    protected <T> T instance(Class<T> clazz) {
        return weldContainer.instance().select(clazz).get()
    }

    protected <T> List<T> populate(Class<T> entityClass, List templates) {
        def entities = templates.collect { entityClass.newInstance(it) }
        ds.save entities
        return entities
    }

    protected <T> T populate(Class<T> entityClass, Map template) {
        return populate(entityClass, [template])[0]
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

    private static final String ID_TEMPLATE = "000000000000000000000000";

    /**
     * 1 => 000000000000000000000001
     * 99 => 000000000000000000000099
     * Completa uma string (em hex) com zeros para que ela fique com 24 digitos. Assim podemos usá-la como um ObjectId
     */
    static ObjectId id(String id) {
        def completeId = ID_TEMPLATE.substring(0, ID_TEMPLATE.length() - id.length()) + id
        return new ObjectId(completeId)
    }
}
