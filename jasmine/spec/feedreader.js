/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* Placing all of the tests within the $() function,
 * since some of these tests may require DOM elements.
 */
$(function() {
 
    describe('RSS Feeds', function() {
        /* allFeeds variable are defined and that it is not
         * empty.
         */
        it('are defined and they are not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed to check that the URL is defined
         * and that the URL is not empty.
         */
        
         it('all have url and they are not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeTruthy();
            });
         });

        /* Loops through each feed to check all names are defined
         * and that the name is not empty.
         */

         it('all has name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
                expect(typeof feed.name).toBe("string");
            });
         });
    });


    
    describe('The menu', function() {
        // To ensure the menu element is hidden by default. 
         
        var body = document.querySelector('body');
        var menuIcon = document.querySelector('.menu-icon-link');

         it('elements are hidden', function() {
            expect($(body).hasClass('menu-hidden')).toBe(true);
         });

         // To ensure the menu changes visibility when the menu icon is clicked. 

         // Menue is hidden when it is clicked.
          it("check the menu's visibility", function() {   
            menuIcon.click();
            expect($(body).hasClass('menu-hidden')).toBe(false);
        
            // Menue display when it is clicked.
            menuIcon.click();
            expect($(body).hasClass('menu-hidden')).toBe(true);
          });
    });
    
     describe('Initial Entries', function() {
     
        /* To check when the loadFeed
         * function is called and completes its work.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        
         /*to check there is at least
         * a single entry element within the feed container.
         */
        it('checking feed container for enteries', function(){
           
            var entriesNum = document.querySelectorAll('.feed .entry').length;
            expect(entriesNum).toBeGreaterThan(0);
        });

    });    

    describe('New Feed Selection', function() {

        /* To ensure when a new feed is loaded
         * the content changes. 
         */
        var firstFeed;
        var secondFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = document.querySelector('.feed').innerHTML;
                done();
            });
        });
        it('content must change after loading feed', function(done) {
            loadFeed(1, function() {
                secondFeed = document.querySelector('.feed').innerHTML;
                expect(secondFeed).not.toEqual(firstFeed);
                done();
            });
        });
    });
}());
