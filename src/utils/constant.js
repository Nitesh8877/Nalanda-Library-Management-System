const USER_STATUS={
    ACTIVE:"Active",
    INACTIVE:"Inactive"
}
const responseCode={
    OK:200,
    BAD_REQUEST:400,
    CREATED:201,
    NO_CONTENT:204,
    FORBIDEN:403,
    INTERENAL_SERVER_ERROR:500,
    UNAUTHORIZED:401,CONFLICT:409
}

const responseMessage={
    USER_CREATED_SUCCESS:"Registration successfully",
    LOGIN_SUCCESS:"Login successfully",
    LOGOUT_SUCCESS:"Logout successfully",
    USER_UPDATE:"User updated successfully",
    USER_DELETE:"User delete successfully",
    USER_GET_SUCCESS:"User get successfully",
    EMAIL_ALREADY:"Email alredy exist",
    USER_NOT:"User not found",
    INVALID_CREDENTIAL:"Invalid credential",
    NOT_FOUND:"Record not found",
    ADD_ROLE:"Role added successfully",
    UPDATE_ROLE:"Role updated successfully",
    DELETE_ROLE:"Role deleted successfully",
    GET_ROLE:"Role get successfully",
    ROLE_ALREADY_EXIST:"Role already exist",
    BOOK_ALREADY_EXIST: "Book already exists.",
    ADD_BOOK: "Book added successfully.",
    UPDATE_BOOK: "Book updated successfully.",
    GET_BOOK: "Book retrieved successfully.",
    DELETE_BOOK: "Book deleted successfully.",
    LIST_BOOKS: "Books listed successfully.",
    BORROW_BOOK: "Book borrowed successfully.",
    RETURN_BOOK: "Book returned successfully.",
    BORROW_HISTORY: "Borrow history retrieved successfully.",
    MOST_BORROWED_BOOKS: "Most borrowed books retrieved successfully.",
    MOST_ACTIVE_MEMBERS: "Most active members retrieved successfully.",
    BOOK_AVAILABILITY: "Book availability summary retrieved successfully."

}
const todoStatus={
   PENDING: 'Pending', COMPLETED:'Completed'
}

module.exports={
    USER_STATUS,responseCode,responseMessage,todoStatus
}