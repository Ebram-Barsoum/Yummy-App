export default class Contact{
    #section;
    constructor() {
        this.#section = $('.content .container');
    }
    
    isValid_input(input,regEx,selector) {
        if (regEx.test(input)) {
            $(selector).addClass('is-valid');
            $(selector).removeClass('is-invalid');
            return true;
        }
        
        $(selector).addClass('is-invalid');
        $(selector).removeClass('is-valid');
        return false;
    }

    show() {
        $(this.#section).html(
            ` <form class="form row m-0 py-5 justify-content-center align-items-center ">
                <div class="col-11 col-md-6 d-flex flex-column gap-3">
                    <div class=" input-group ">
                        <input type="text" class="form-control is-invalid" placeholder="Enter Your Name" required name="name" id="name">
                        <div class=" invalid-feedback">special characters ans number not allowd</div>
                    </div>
                    
                    <div class=" input-group ">
                        <input type="tel" class="form-control is-invalid"  placeholder="Enter Your Phone" required name="phone" id="phone">
                        <div class=" invalid-feedback">Enter a valid number</div>
                    </div>
                    
                    <div class=" input-group ">
                        <input type="number" class="form-control is-invalid" placeholder="Enter Your Age" required name="age" id="age">
                        <div class=" invalid-feedback">Enter a valid age</div>
                    </div>
                </div>

                <div class="col-11 col-md-6 d-flex flex-column gap-3">
                    <div class=" input-group ">
                        <input type="email" class="form-control is-invalid" placeholder="Enter Your Email" required name="email" id="email">
                        <div class=" invalid-feedback">Email is not valid, Ex: example@yyy.xxx</div>
                    </div>

                    <div class=" input-group ">
                        <input type="password" class="form-control is-invalid" placeholder="Enter Your Password" required name="pwd" id="pwd">
                        <div class=" invalid-feedback"> min length is 8, at least 1 letter and 1 number</div>
                    </div>

                    <div class=" input-group ">
                        <input type="password" class="form-control is-invalid" placeholder="Re-Enter Your Password" required name="confirm-pwd" id="confirm-pwd">
                        <div class=" invalid-feedback">Make sure you enter the same password</div>
                    </div>
                </div>
            
               <button type="button" class="btn btn-outline-warning mt-4 col-sm-11 px-md-5" disabled id="btn-submit">Submit</button>
             </form>
            `
        );

    
       let isValidName = false,
        isValidEmail = false,
        isValidPhone = false,
        isValidAge = false,
        isValidPwd = false,
        isPwdConfirmed = false;
        
        document.querySelector('.form #name').oninput = ((e) => {
            const nameRegEx = /^\w+/;
            isValidName = this.isValid_input(e.target.value, nameRegEx,'.form #name');
        });

        document.querySelector('.form #email').oninput = ((e) => {
            const emailRegEx = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
            isValidEmail = this.isValid_input(e.target.value,emailRegEx,'.form #email');
        });
        

        document.querySelector('.form #phone').oninput = ((e) => {
            const phoneRegEx = /^(01)([0-2]|[5])[0-9]{8}$/;
            isValidPhone = this.isValid_input(e.target.value,phoneRegEx,'.form #phone');
        });

        document.querySelector('.form #pwd').oninput = ((e) => {
            const pwdRegEx = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
            isValidPwd = this.isValid_input(e.target.value,pwdRegEx,'.form #pwd');
        });

        document.querySelector('.form #confirm-pwd').oninput = ((e) => {
            if (e.target.value == $('.form #pwd').val()) {
                $('.form #confirm-pwd').addClass('is-valid');
                $('.form #confirm-pwd').removeClass('is-invalid');
                isPwdConfirmed = true;
            }
            else {
                $('.form #confirm-pwd').addClass('is-invalid');
                $('.form #confirm-pwd').removeClass('is-valid');
                isPwdConfirmed = false;
            }
        });
        
        document.querySelector('.form #age').oninput = ((e) => {
            const ageRegEx = /^[1-9]([0-9]){0,1}$/;
            isValidAge = this.isValid_input(e.target.value,ageRegEx,'.form #age');
        });

        $('.form input').change(function () {
            if (isValidName && isValidEmail && isValidPhone && isValidAge && isValidPwd && isPwdConfirmed) {
                $('.form #btn-submit').attr('disabled', false);
            }
            else {
                $('.form #btn-submit').attr('disabled', true);
            }
        });
    }
}