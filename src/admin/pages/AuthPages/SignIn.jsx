import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn({ currentUser }) {
  return (
    <>
      <PageMeta title="" description="" />
      <AuthLayout>
        <SignInForm currentUser={currentUser} />
      </AuthLayout>
    </>
  );
}
