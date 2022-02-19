async function postRegisterForm() {
    const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(this.credentials),
    });

    if (response.status !== 201) {
        throw new Error("user object was not created");
    }
    console.log(response);

    // parses JSON response into native JavaScript objects
    return response.json();
}

(function register() {
    postRegisterForm()
        .then((data) => {
            console.log(data);

            localStorage.setItem("user-info", JSON.stringify(data));
        })
        .catch((err) => console.log(err));
});
