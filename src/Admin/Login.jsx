import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const User = {
        username: "admin",
        password: "admin123",
        role: "admin"
    }

    const [user, setuser] = useState({
        username: "",
        password: "",
        role: ""
    })

    const changes = (e) => {
        const { name, value } = e.target

        setuser((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const submit = (e) => {
        e.preventDefault()

        const Loginuser = user.username === User.username
        const Loginpass = user.password === User.password

        if (Loginuser && Loginpass) {
            const users = JSON.parse(localStorage.getItem("logindata")) || []
            const data = [...users, user]

            localStorage.setItem("logindata", JSON.stringify(data))

            navigate(`/${User.role}`)
        } else {
            alert("User login not correct")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">

            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

                {/* Title */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Login
                </h2>

                {/* Form */}
                <form onSubmit={submit} className="space-y-5">

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            onChange={changes}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            onChange={changes}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Role
                        </label>
                        <select
                            name="role"
                            onChange={changes}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            required
                        >
                            <option value="">Select role</option>
                            <option value="admin">{User.role}</option>
                        </select>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300 shadow-md"
                    >
                        Sign In
                    </button>

                </form>

                {/* Footer */}
                <p className="text-sm text-gray-500 text-center mt-6">
                    Secure login system
                </p>
            </div>

        </div>
    )
}

export default Login