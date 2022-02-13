import loadable from '@loadable/component';

const Auth = ({}) => {
    document.location.href = "/auth/login";
}
export default Auth;
export const Login = loadable(() => import('./Login.js'));
export const Logout = loadable(() => import('./Logout.js'));
export const SignUp = loadable(() => import('./SignUp.js'));