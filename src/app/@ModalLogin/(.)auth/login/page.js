import LoginForm from "@/app/components/auth/LoginForm";
import Modal from "@/app/components/ui/Modal";


const InterceptLogin = () => {
    return (
        <>
            <Modal>
                <div className="max-w-[450px] w-full mx-auto p-6 border border-gray-700/20 rounded-md">
                    <h4 className="font-bold text-2xl">Modal Sign in</h4>
                    <LoginForm />
                </div>
            </Modal>
        </>
    );
};

export default InterceptLogin;