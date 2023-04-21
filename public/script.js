import * as firebase from "./firebase.js";
import "./firebase.js"
const db = firebase.getFirestore(firebase.firebaseApp);

const signupBtn = document.getElementById("confirmsignup")
const signinBtn = document.getElementById("confirmSignin")
const orderBtn = document.getElementById("orderHeaderButton")
const orderBtn2 = document.getElementById("orderHeaderButton2")
const addToCart = document.getElementById("orderNowBtn")

// addToCart.addEventListener("click", ()=>{
//     addCart();
// })



signinBtn.addEventListener('click', function () {
    const emailInput = document.getElementById("signinEmail")
    const passwordInput = document.getElementById("signinPassword")
    const emailValue = emailInput.value;
    const pwdValue = passwordInput.value;
    getUser(emailValue, pwdValue);

});

function getUser(emailValue, pwdValue) {
    const required = document.getElementById("requiredSignin");
    const notexist = document.getElementById("notExist");
    const success = document.getElementById("successfullLogin");
    const headerBtn = document.getElementById("signupHeaderButton");
    const headerBtn2 = document.getElementById("signupHeaderButton2");

    if ((emailValue && pwdValue)) {
        const citiesRef = firebase.collection(db, "user_accounts");
        firebase.getDocs(citiesRef)
            .then(res => {
                var c = 0;
                var name,email;
                res.forEach((doc) => {
                    if (emailValue === doc.data().Email) {
                        notexist.style.display = "none";
                        name = doc.data().First_name;
                        email = doc.data().Email;

                        c = 1;
                        return false;
                    }
                })
                if (c == 0) {
                    notexist.style.display = "block";
                }
                else {
                    success.style.display = "block"
                    headerBtn.innerHTML = name;
                    headerBtn.value = email
                    console.log(headerBtn.value)
                    headerBtn.disabled = true
                    headerBtn2.innerHTML = name;
                    headerBtn2.value = email
                    headerBtn2.disabled = true
                    orderBtn.style.visibility = "visible"
                    orderBtn2.style.visibility = "visible"
                }

            }).catch(err => {
                console.log(err)
            });
    } else {
        required.style.display = "block"
    }
}

signupBtn.addEventListener('click', function () {
    var emailValue, pwdValue, firstnameValue, lastnameValue, countryValue;
    const firstnameInput = document.getElementById("firstName")
    const lastnameInput = document.getElementById("lastName")
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")
    const countryInput = document.getElementById("country")

    emailValue = emailInput.value;
    pwdValue = passwordInput.value;
    firstnameValue = firstnameInput.value;
    lastnameValue = lastnameInput.value;
    countryValue = countryInput.value;
    getAllUsers(emailValue, pwdValue, firstnameValue, lastnameValue, countryValue)

});

function getAllUsers(emailValue, pwdValue, firstnameValue, lastnameValue, countryValue) {
    const already = document.getElementById("accountExist");
    const required = document.getElementById("required");
    required.style.display = "none"

    if ((emailValue && pwdValue && firstnameValue && lastnameValue && countryValue)) {
        const citiesRef = firebase.collection(db, "user_accounts");
        firebase.getDocs(citiesRef)
            .then(res => {
                var c = 0;
                res.forEach((doc) => {
                    if (emailValue === doc.data().Email) {
                        already.style.display = "block";
                        c = 1;
                    }
                })
                if (c == 0) {
                    already.style.display = "none";
                    createAccount(emailValue, pwdValue, firstnameValue, lastnameValue, countryValue);
                }

            }).catch(err => {
                console.log(err)
            });
    } else {
        required.style.display = "block"
    }


}

function createAccount(emailValue, pwdValue, firstnameValue, lastnameValue, countryValue) {
    const created = document.getElementById("created");
    firebase.addDoc(firebase.collection(db, "user_accounts"), {
        Email: emailValue,
        First_name: firstnameValue,
        Last_name: lastnameValue,
        Password: pwdValue,
        Country: countryValue
    })
        .then(res => {
            console.log(res)
            created.style.display = "block"
        }).catch(err => {
            console.log(err)
        });
}


function displayPosts(id, type) {
    if (type === "jewellery") {
        getDetails(id, "jewellery_items")
    }
    else if (type === "bags") {
        getDetails(id, "bags");

    }

}

function getDetails(id, coll) {
    firebase.getDocs(firebase.collection(db, coll))
        .then(res => {
            res.forEach((doc) => {
                getData(id, doc.data(), addCart)
            })
        }).catch(err => {
            console.log(err)
        });
}

function getCart(imageUrl, name, price) {
    const headerBtn = document.getElementById("signupHeaderButton");
    const headerBtn2 = document.getElementById("signupHeaderButton2");
    const user = headerBtn.value;
    const signinBtn = headerBtn.innerText;
    const citiesRef = firebase.collection(db, "shopping_cart");
    
    if (signinBtn === "SignIn") {
        alert("Please Sign in to use cart");
    }
    else {
        firebase.getDocs(citiesRef)
            .then(res => {
                var c = 0;
                var q = 0;
                var id;
                res.forEach((doc) => {
                    if (name === doc.data().product_name && user === doc.data().user_name) {
                        c = 1;
                        q = doc.data().quantity;
                        id = doc.id;
                    }
                })
                if (c == 0) {
                    console.log(user)
                    addCart(imageUrl, name, price, 1, user)
                }
                else if (c > 0) {
                    updateCart(name, q, id)
                }

            }).catch(err => {
                console.log(err)
            });
    }

}
function updateCart(name, q, id) {
    const cartDoc = firebase.doc(db, "shopping_cart", id);
    firebase.updateDoc(cartDoc, {
        quantity: q + 1
    }).then(res => {
        console.log(res)
        const btn = document.getElementById(name);
            var last = btn.innerText;
            btn.innerText = 'Item added';
            setTimeout(function () {
                btn.innerText = last;
            }.bind(btn), 2000);
    }).catch(err => {
        console.log(err)
    });

}
function addCart(imageUrl, name, price, proQuantity, user) {
    firebase.addDoc(firebase.collection(db, "shopping_cart"), {
        image_url: imageUrl,
        product_name: name,
        product_price: price,
        quantity: proQuantity,
        user_name: user
    })
        .then(res => {
            console.log(res)
            const btn = document.getElementById(name);
            var last = btn.innerText;
            btn.innerText = 'Item added';
            setTimeout(function () {
                btn.innerText = last;
            }.bind(btn), 2000);
        }).catch(err => {
            console.log(err)
        });
}

orderBtn.addEventListener("click", ()=>{
    document.getElementById("cartItems-div").innerHTML = "";
    document.getElementById("cartEmptySpan").style.display = "none";
    getCartAllItems("cartItems-div");
})

orderBtn2.addEventListener("click", ()=>{
    document.getElementById("cartItems-div").innerHTML = "";
    document.getElementById("cartEmptySpan").style.display = "none";
    getCartAllItems("cartItems-div");
})


function getCartAllItems(id){
    const headerBtn = document.getElementById("signupHeaderButton");
    const user = headerBtn.value;
    const emptyText = document.getElementById("cartEmptySpan");
    const citiesRef = firebase.collection(db, "shopping_cart");
        firebase.getDocs(citiesRef)
            .then(res => {
                var c = 0;
                res.forEach((doc) => {
                    console.log("1"+doc.data().user_name, user)
                    if (user === doc.data().user_name) {
                        displayCart(id, doc.data().image_url, doc.data().product_name, doc.data().product_price, doc.data().quantity);
                        c = 1;
                    }
                })
                if (c == 0) {
                    emptyText.style.display = "block";
                }

            }).catch(err => {
                console.log(err)
            });
        
}

function displayCart(id, url, name, price, quantity) {
    const div = document.createElement('div');
    div.innerHTML = `<div>
    <div class="card mb-3">
        <div class="card-body">
            <div class="d-flex justify-content-between main-card-body">
                <div class="d-flex flex-row align-items-center">
                    <div style="margin: 2px;">
                        <img src=${url}
                            class="rounded-3 cartImage" alt="Shopping item" style="width:80px;">
                    </div>
                    <div class="ms-3 cart-item-title">
                        <h5 style="font-size:18px;">${name}</h5>
                        <!--<p class="small mb-0">256GB, Navy Blue</p>-->
                    </div>
                </div>
                <div class="d-flex flex-row align-items-center">
                    <div style=" margin-left: 5px; margin-right: 5px;">
                        <h5 style="padding: 10px;font-size:18px;" class="fw-normal mb-0">${quantity}</h5>
                    </div>
                    <div style="width: 70px;">
                        <h5 style="font-size:18px;"class="mb-0">&#8377; ${price}</h5>
                    </div>
        
                </div>
            </div>
        </div>
    </div>
</div>`
    document.getElementById(id).appendChild(div);
}
function getData(id, data, addCart) {
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card post-outer-container shadow-sm bg-white rounded" id="initial-post">
            <article id="${'postDiv-' + data.name}" class="card-body post-div-main">
                <a id="imageLink" class="imageLink post-thumbnail-container"
                    href="#" value="${data.image_url}">
                    <img
                        src=${data.image_url}>
                </a>
                <h3 class="productNameLink post-title entry-title" value="${data.name}">
                    <a id="productNameLink"href="#" >
                        ${data.name}
                    </a>
                </h3>
                <span id="productPriceLink"class=" productPriceLink price" value="${data.price}">&#8377; ${data.price}</span>
                <button id="${data.name}" class="btn-signup buyNowBtn">
                                Add to Cart
                            </button>
                
            </article>
        </div>

            

    `;

    document.getElementById(id).appendChild(div);
    const btnId = document.getElementById(data.name)
    btnId.addEventListener("click", () => {
        const parentId = btnId.parentElement;
        const aValue = parentId.querySelector(".imageLink")
        const aName = parentId.querySelector(".productNameLink")
        const aPrice = parentId.querySelector(".productPriceLink")
        getCart(aValue.getAttribute("value"), aName.getAttribute("value"), aPrice.getAttribute("value"))
    })

}

var closeToggle = document.getElementById("close-toggle-button");
var openToggle = document.getElementById("toggle-button");
openToggle.addEventListener('click', function () {
    document.getElementById("mySidenav").style.width = "250px";
});

closeToggle.addEventListener('click', function () {
    document.getElementById("mySidenav").style.width = "0";
});


function myFunction(x) {
    if (x.matches) { // If media query matches
        document.getElementById("mySidenav").style.width = "0";
    }
}

var x = window.matchMedia("(min-width: 500px)")
x.addEventListener("change", myFunction)
myFunction(x)

$('.input').blur(function () {
    var $this = $(this);
    if ($this.val())
        $this.addClass('used');
    else
        $this.removeClass('used');
});

export { displayPosts, getCartAllItems }