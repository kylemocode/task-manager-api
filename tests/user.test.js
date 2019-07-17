const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: "mike@example.com",
    password: "asdf1234",
    tokens: [{
        token: jwt.sign({_id: userOneId},process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

// afterEach(() => {

// })

//beforeAll
//afterAll
test('Should register a new user',async () => {
    const response = await request(app).post('/users').send({
        name: 'full-stack',
        email: '105306006@example.com',
        password: 'asdf1234'
    }).expect(201)

    //Assert that the db was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    //assert about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'full-stack',
            email: '105306006@example.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('asdf1234')
})

test('should login in a account',async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password:　userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('creat test for bad credentials', async () => {
    await request(app).post('/users/login').send({
        email: '105306006@nccu.edu.tw',
        password:　'asdf1234'
    }).expect(400)
})


test('should get profile for user',async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should test delete route',async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()

})

test('should upload avatar image',async() => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .attach('upload','tests/fixtures/philly.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update valid user fields',async() => {
    await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Harry'
        })
        expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Harry')
})