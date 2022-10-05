import bcrypt from 'bcryptjs'
const usuarios = [
{
    nombre: 'edwin',
    email: 'yassiel@gmail.com',
    confirmado:1,
    password: bcrypt.hashSync('password',10)
}
]

export default usuarios