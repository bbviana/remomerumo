package br.com.remomeurumo.test

import groovy.transform.ToString
import org.junit.After
import org.junit.Before
import org.junit.Test

import javax.ws.rs.client.Entity
import javax.ws.rs.core.Response

import static br.com.remomeurumo.controller.Paging.DEFAULT_PAGE_SIZE
import static junit.framework.Assert.assertNull
import static junit.framework.Assert.assertTrue

/**
 * @author bbviana
 */
abstract class CrudTest extends BaseTest {
    def ctx = new Context()

    void configure(Closure closure) {
        closure.setDelegate(ctx)
        closure.call()
    }


    @Before
    void prepare() {
        prepareCrud()

        def entityClass = ctx.entityClass
        ctx.data.each {
            def persisted = populate(entityClass, it)
            it.id = persisted.id
        }
    }

    abstract void prepareCrud()

    @After
    void after() {
        ctx.cleanDataBaseAfterEachTest && cleanDataBase()
    }

    static void log(def msg) {
        println "-------------------------------------------"
        println msg
        println "-------------------------------------------"
    }

    ////////////////////////////////////////////////////////////////////////////////
    // TESTES
    ////////////////////////////////////////////////////////////////////////////////

    @Test
    void testCreate() {
        def url = ctx.url
        def entityClass = ctx.entityClass
        def inserts = ctx.inserts

        inserts.each { template ->
            log "[POST] /${url} ${template}"

            Response response = target(url).request().post(Entity.json(template))

            def json = toJson(response)
            template.id = (long) json.id

            compare(json, template)
            compare(find(entityClass, template.id), template)
        }

    }

    @Test
    void testUpdate() {
        def url = ctx.url
        def entityClass = ctx.entityClass
        def updates = ctx.updates

        updates.each {
            def from = it.from
            def to = it.to

            log "[PUT] /${url}/${from.id} ${to}"

            Response response = target("${url}/${from.id}").request().put(Entity.json(to))
            def json = toJson(response)

            compare(json, to)
            compare(find(entityClass, from.id), to)
        }
    }


    @Test
    void testLoad() {
        def url = ctx.url
        def data = ctx.data

        data.each {
            log "[GET] /${url}/${it.id}"

            Response response = target("${url}/${it.id}").request().get()
            def json = toJson(response)
            println json
            def element = json.data

            compare(element, it, ["index"])
        }
    }

    @Test
    void testList() {
        def url = ctx.url
        def data = ctx.data

        log "[GET] /${url}"

        Response response = target(url).request().get()
        def result = toJson(response)
        List list = result.data
        def paging = result.paging

        compare(list, data, ["index"])
        compare(paging, [
                currentPage : 1,
                pageSize    : DEFAULT_PAGE_SIZE,
                totalPages  : 1,
                totalResults: data.size()
        ])
    }


    @Test
    void testSearchCount() {
        def url = ctx.url
        def data = ctx.data

        log "[GET] /${url}?count=2"

        Response response = target(url).queryParam("count", "2").request().get()
        def result = toJson(response)
        List list = result.data
        def paging = result.paging

        compare(list, data[0..1], ["index"])
        compare(paging, [
                currentPage : 1,
                pageSize    : 2,
                totalPages  : Math.ceil((double) data.size() / 2),
                totalResults: data.size()
        ])
    }

    @Test
    void testSearchCountPage() {
        def url = ctx.url
        def data = ctx.data

        log "[GET] /${url}?count=2&page=2"

        Response response = target(url).queryParam("count", "2").queryParam("page", "2").request().get()
        def result = toJson(response)
        List list = result.data
        def paging = result.paging

        compare(list, data[2..3], ["index"])
        compare(paging, [
                currentPage : 2,
                pageSize    : 2,
                totalPages  : Math.ceil((double) data.size() / 2),
                totalResults: data.size()
        ])
    }


    @Test
    void testSearchQuery() {
        def url = ctx.url
        def searches = ctx.searches

        searches.each { search ->
            Map query = search.query
            List<Map> expected = search.expected

            log "[GET] /${url} query=${query}"

            def target = target("alunos")
            query.each { name, value ->
                target = target.queryParam(name as String, value)
            }

            Response response = target.request().get()
            def result = toJson(response)
            List list = result.data
            def paging = result.paging

            compare(list, expected, ["index"])
            compare(paging, [
                    currentPage : 1,
                    pageSize    : DEFAULT_PAGE_SIZE,
                    totalPages  : 1,
                    totalResults: expected.size()
            ])
        }
    }

    @Test
    void testRemove() {
        def url = ctx.url
        def entityClass = ctx.entityClass
        def removes = ctx.removes

        removes.each {
            log "[DELETE] /${url}/${it.id}"

            target("${url}/${it.id}").request().delete()

            assertNull find(entityClass, it.id)
        }
    }
}

@ToString(includeNames = true)
class Context {
    boolean cleanDataBaseAfterEachTest = false
    List<Map> data = []
    Class entityClass
    String url

    List<Map> inserts = []
    List<Update> updates = []
    List<Search> searches = []
    List<Map> removes = []

    void cleanDataBaseAfterEachTest(boolean clean) {
        this.cleanDataBaseAfterEachTest = clean
    }

    void url(String url) {
        this.url = url
    }

    void entity(Class entityClass) {
        // para evitar MissingPropertyException quando fizermos entityClass.newInstance([index])
        entityClass.metaClass.index = 0
        this.entityClass = entityClass
    }

    void initialData(Map... data) {
        assertTrue "initialData deve ter mais do que 4 elementos", data.size() >= 4

        data.eachWithIndex { element, index ->
            element.index = index
            this.data << element
        }
    }

    void strategy(Closure closure) {
        closure.setDelegate(this)
        closure.call()
    }

    def data(Map filter) {
        def result = this.data.findAll {
            compare(it, filter)
        }

        result.size() == 1 ? result[0] : result
    }

    private static boolean compare(Map target, Map filter) {
        filter.every {
            def targetPropertyValue = target[it.key]
            def filterValue = it.value
            if (filterValue instanceof Collection) {
                ((Collection) filterValue).contains(targetPropertyValue)
            } else {
                filterValue == targetPropertyValue
            }
        }
    }

    void insert(Map... data) {
        this.inserts.addAll(data)
    }

    def update(Map data) {
        return [
                to: {
                    Map newData -> this.updates << new Update([from: data, to: newData])
                }
        ]
    }

    def search(Map args) {
        Map query = args.for

        return [
                expect: { def expected ->
                    if (expected instanceof Collection) {
                        this.searches << new Search([query: query, expected: expected])
                    } else {
                        this.searches << new Search([query: query, expected: [expected]])
                    }
                }
        ]
    }

    def remove(Map... data) {
        this.removes.addAll(data)
    }
}


class Update {
    Map from
    Map to

    Map getFrom() {
        return from
    }

    void setFrom(Map from) {
        this.from = from
    }

    Map getTo() {
        return to
    }

    void setTo(Map to) {
        this.to = to
    }
}

class Search {
    Map query
    List<Map> expected
}