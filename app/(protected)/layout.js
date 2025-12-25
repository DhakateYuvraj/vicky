import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "app/api/auth/[...nextauth]/route";

export default async function HomeLayout({ children }) {
  const session = await getServerSession(authOptions);

  // ❌ No session or expired session
  if (!session) {
    redirect("/login");
  }

  // ✅ Session valid → render client layout below
  return <>{children}</>;
}
