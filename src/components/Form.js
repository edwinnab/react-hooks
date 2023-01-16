import React, { useEffect, useState } from 'react'

function Form() {
    //capture form data
    // const [firstname, setFirstName] = useState("")
    // const [lastname, setLastName] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    // const [checkbox, setCheckbox] = useState(false)

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        checkbox: false
    })
    const [resource, setResource] = useState("")

    const [items, setItems] = useState([])

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        fetch("http://localhost:3002/posts", {
            method: "POST", 
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        console.log(formData)
    }

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${resource}`)
        .then(r => r.json())
        .then(data => setItems(data))
    }, [resource])

    return ( 
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">First Name</label>
                    <input type="text" 
                    className="form-control"
                     id="firstname"
                     value={formData.firstname}
                     onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Last Name</label>
                    <input type="text" 
                    className="form-control" 
                    id="lastname"
                    value={formData.lastname}
                    onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" 
                    id="email" 
                    aria-describedby="emailHelp"
                    value={formData.email}
                    onChange={handleChange}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" 
                    className="form-control"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" 
                    className="form-check-input" 
                    id="checkbox"
                    checked ={formData.checkbox}
                    onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className='container'>
            <button type="submit" className="btn btn-primary mx-3" onClick={() => setResource("posts")}>Posts</button>
            <button type="submit" className="btn btn-primary mx-3" onClick={() => setResource("comments")}>Comments</button>
            <button type="submit" className="btn btn-primary mx-3" onClick={() => setResource("users")}>Users</button>
            </div>
            <h1>{resource}</h1>
            {items.map((item) => {
                return<pre key={item.id}>{JSON.stringify(item)}</pre>
            })}
        </div>
     );
}

export default Form;