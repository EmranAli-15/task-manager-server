const note = {
    _id: ObjectId,
    title: "lorem ipsum",
    details: "lorem ipsum dolor",
    links: ["http://...", "http://..."],
    photos: ["http://...", "http://..."],
    color: {
        head: "red",
        body: "deep red"
    },
    category: ObjectId,     // reference to Category
    userId: ObjectId,       // reference to User
    createdAt: Date,
    updatedAt: Date
}

const category = {
    _id: ObjectId,
    name: "education"
}

const user = {
    _id: ObjectId,
    name: "John Doe",
    email: "john@email.com",
    hashedPassword: "encrypted-hash",
    categories: [ObjectId, ObjectId], // references to Category
    createdAt: Date
}
