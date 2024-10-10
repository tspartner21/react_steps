export default function MailForm(){
return (
        <article className='mailForm'>

            <form>                
            <div className="formBox">
                
                <form>
                    <div className="upper">
                        <span>
                            <label htmlFor="uName">Name</label>
                            <input type="text" id="uName" placeholder="Leave your name" />
                        </span>
                        <span>
                            <label htmlFor="uMail">E-Mail</label>
                            <input type="text" id="uMail" placeholder="Leave your email" />
                        </span>
                    </div>
                    <div className="lower">
                        <label htmlFor="msg">Message</label>
                        <textarea name="msg" id="msg" placeholder="Leav your message">
                        </textarea>
                    </div>

                    {/*전송 , 취소 버튼 그룹 */}
                    <nav className="btnSet">
                        <input type="reset" value="Cancel" />
                        <input type="submit" value="Send" />
                    </nav>
                </form>
            </div>
            <div className='info'>
                <h2>Information</h2>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate reprehenderit laudantium cupiditate qui? Possimus sint eum
                    obcaecati ut cum ea, praesentium temporibus, quos vel beatae vero esse quisquam expedita animi.
                </p>
                <br />
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, sequi ipsum. Deleniti nesciunt rerum ex!</p>
            </div>

            </form>
            

            
        </article>
    );
}