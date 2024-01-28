export default class Contact{
    #section;
    constructor() {
        this.#section = $('.content .container');
    }

    show() {
        $(this.#section).html(
            ` <form class="form row m-0 py-5 justify-content-center align-items-center ">
            <div class="col-11 col-md-6 d-flex flex-column gap-3">
                <input type="text" class="form-control" placeholder="Enter Your Name" required name="name" id="name">
                <input type="tel" class="form-control"  placeholder="Enter Your Phone" required name="phone" id="phone">
                <input type="number" class="form-control" placeholder="Enter Your Age" required name="age" id="age">  
            </div>

            <div class="col-11 col-md-6 d-flex flex-column gap-3">
                <input type="email" class="form-control" placeholder="Enter Your Email" required name="email" id="email">
                <input type="password" class="form-control" placeholder="Enter Your Password" required name="pwd" id="pwd">
                <input type="password" class="form-control" placeholder="Re-Enter Your Password" required name="confirm-pwd" id="confirmpwd">
            </div>
            
            <button type="button" class="btn btn-outline-warning mt-4 col-sm-11 px-md-5">Submit</button>
             </form>
            `
        );
    }
}