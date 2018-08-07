/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds letiable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds letiable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //Tests to ensure url is not empty and resembles a valid URL
        it('URLs are defined and vaild', function() {
            allFeeds.forEach(function(feed) {
            	expect(feed.url).toBeDefined();
            	/*RegEx Explanation:
            	 *This should be close enough to approximate a valid URL however due to the way it checks 'http://a...' would be considered vaild
            	 *<--] ^(http(s)?:\/\/) [--> Ensures URL starts with 'http://' or 'https://'
            	 *<--] [\w.-]+(?:\.[\w\.-]+)+ [--> Ensures next part of string has three 'words' that are alphanumeric, '_', '.' or '-' of any length
            	 *Additionally checks to ensure each word is sperated by a '.'
            	 *Note: Other than the first word, any other word can be empty
            	 *<--] (?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$ [--> Ensures next part of string does or doesn't have any other special or alphanumeric characters
            	 *Special Characters defined as: '-' '.' '_' '~' ':' '/' '?' '#' '[' ']' '@' '!' '$' '&' ''' '(' ')' '*' '+' ',' ';' and '='
            	 */
            	//TODO: Enhance RegEx to even more closely match a valid URL
                expect(feed.url).toMatch(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
            });
        });

		//Tests to ensure name is not empty and is defined.
        it('names are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
            	expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function() {
        //Tests to ensure menu has class, 'menu-hidden' by default.
        it('is initially hidden', function() {
        	expect(document.getElementsByTagName('body')[0].classList).toMatch('menu-hidden');
        });
        

        //Tests to ensure menu unhides/hides when clicked. Able to test with a select number of clicks.
        it('unhides/hides when clicked', function() {
        	let menuButton = document.getElementsByClassName('menu-icon-link')[0];
        	let menu = document.getElementsByTagName('body')[0].classList;
			menuButton.click();
			expect(menu).not.toMatch('menu-hidden');
			menuButton.click();
			expect(menu).toMatch('menu-hidden');
        });
    });

    describe('Initial Entries', function() {
        //Runs loadFeed function and waits for it to complete.
        beforeEach(function(done) {
        	loadFeed(0, function() {
        		done();
        	});
        });

        //Tests if loadFeed loaded the Initial Entries.
        it('are able to be loaded', function() {
			let entries = document.querySelectorAll('.feed .entry');
        	expect(entries.length).not.toBe(0);
        });
    });

    describe('New Feed Selection', function() {
    	let firstFeedHTML;
    	let secondFeedHTML;

		//Runs loadFeed function 2 times and collects the current feed's content.
        beforeAll(function(done) {
		    loadFeed(0, function() {
		    	firstFeedHTML = document.querySelector('.feed').innerHTML;
		        loadFeed(1, function() {
		        	secondFeedHTML = document.querySelector('.feed').innerHTML;
		        	done();
		    	});
			});
        });

        //Ensures feeds loaded are different.
        it('changes content when new feeds are selected', function() {
        	expect(firstFeedHTML).not.toEqual(secondFeedHTML);
        });
    });
}());
