/**
 * 享元模式
 * 享元模式是一个优化重复、缓慢和低效数据共享代码的经典结构化解决方案。
 * 它的目标是以相关对象尽可能多的共享数据，来减少应用程序中内存的使用(例如：应用程序的配置、状态等)
 */

var Book = function (title, author, genre, pageCount, publisherID, ISBN) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pageCount = pageCount;
    this.publisherID = publisherID;
    this.ISBN = ISBN;

};

// Book Factory singleton
var BookFactory = (function () {
    var existingBooks = {}, existingBook;

    return {
        createBook: function (title, author, genre, pageCount, publisherID, ISBN) {

            existingBook = existingBooks[ISBN];
            if (!!existingBook) {
                return existingBook;
            } else {

                var book = new Book(title, author, genre, pageCount, publisherID, ISBN);
                existingBooks[ISBN] = book;
                return book;

            }
        }
    };

});

const bookFactory = new BookFactory()

// BookRecordManager singleton
var BookRecordManager = (function () {

    var bookRecordDatabase = {};

    return {
        // add a new book into the library system
        addBookRecord: function (id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability) {

            var book = bookFactory.createBook(title, author, genre, pageCount, publisherID, ISBN);

            bookRecordDatabase[id] = {
                checkoutMember: checkoutMember,
                checkoutDate: checkoutDate,
                dueReturnDate: dueReturnDate,
                availability: availability,
                book: book
            };
        },
        updateCheckoutStatus: function (bookID, newStatus, checkoutDate, checkoutMember, newReturnDate) {

            var record = bookRecordDatabase[bookID];
            record.availability = newStatus;
            record.checkoutDate = checkoutDate;
            record.checkoutMember = checkoutMember;
            record.dueReturnDate = newReturnDate;
        },

        extendCheckoutPeriod: function (bookID, newReturnDate) {
            bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
        },

        isPastDue: function (bookID) {
            var currentDate = new Date();
            return currentDate.getTime() > Date.parse(bookRecordDatabase[bookID].dueReturnDate);
        }
    };

});

const manager = new BookRecordManager()
manager.addBookRecord(1, '人性弱点', '卡耐基')