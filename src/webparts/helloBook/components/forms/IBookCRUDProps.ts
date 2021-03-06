import { BookService } from '../../service/BookService';
import { Book } from '../../service/vo/Book';

interface IBookCRUDProps {
    mode: Mode;
    bookId?: string;
    handleSubmit(book: Book, mode: Mode): void;
    loadBook(bookId: string): Promise<Book>;
    bookExsists(bookId: string): Promise<boolean>;
    history?: any;
}

enum Mode {
    NEW, EDIT, DELETE
}

export { IBookCRUDProps, Mode };