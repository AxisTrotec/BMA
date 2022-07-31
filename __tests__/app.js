describe('Create', () => {
    let connect;
    let db;

    var mongoDB = 'mongodb+srv://admin:admin21321@cluster0.op2uu.mongodb.net/?retryWrites=true&w=majority'

    beforeAll(async () => {
        connect = mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
    })
    
    db = mongoose.connection;
    db.on('error', console.error.bind(console, '[Error] MongoDB connection error'))

    afterAll(async () => {
        await connect.close()
    })
})

it("Should create a fake account", () => {
    const users = db.collection('users')

    const testUser = {username: "testUser", email: "testUser@test.com", phone: "7783201682", password: "test21321"}
    users.insertOne(testUser)

    const created =  users.findOne({email: "testUser@test.com"})
    expect(created.password).toEqual(testUser.password)
})

it("Should be able to login", () => {
    const users = db.collection('users')

    const created = users.findOne({email: "axistrotec@outlook.com"})
    expect(created.password).toEqual("admin21321")
})