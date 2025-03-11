import "./Login.css";
import {User} from "lucide-react"

const Login =()=>{
    return <div className="login_main df">
        <div className="login_image">
            {/* <img src="" alt="" /> */}
        </div>
        <div className="login_content df dfc df_fd_c">
            <h1>IDCC CONTEST</h1>
            <p>The IDCC coding platform is a secure online environment for competitive coding</p>
            <div className="df df_fd_c input_wrapper">
                <div className="df df_ai_center participant"><User/><span>Participant 1</span></div>
                <div className="df df_jc_space input_sub">
                    <div className="df df_fd_c input_box">
                        <label htmlFor="participant-1">Roll No</label>
                        <input type="text"  id="participant-1"/>
                    </div>
                    <div className="df df_fd_c input_box">
                        <label htmlFor="participant-1-name">Name</label>
                        <input type="text"  id="participant-1-name"/>
                    </div>
                </div>
            </div>
            <div className="df df_fd_c input_wrapper">
                <div className="df df_ai_center participant"> <User /><span>Participant 2</span></div>
                <div className="df df_jc_space input_sub">
                    <div  className="df df_fd_c input_box">
                        <label htmlFor="participant-2">Roll No</label>
                        <input type="text"  id="participant-2"/>
                    </div>
                    <div className="df df_fd_c input_box">
                        <label htmlFor="participant-2-name">Name</label>
                        <input type="text"  id="participant-2-name"/>
                    </div>
                </div>
            </div>
            <div className="df df_jc_fs continue_button">
                <button>Continue</button>
            </div>
        </div>
    </div>
}

export default Login;