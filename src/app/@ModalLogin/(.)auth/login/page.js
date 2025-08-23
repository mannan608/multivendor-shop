import LoginForm from "@/app/components/auth/LoginForm";
import Modal from "@/app/components/ui/Modal";


const InterceptLogin = () => {
    return (
        <>
            <Modal>
                <div className="w-full">
                    <LoginForm />
                </div>
            </Modal>
        </>
    );
};

export default InterceptLogin;