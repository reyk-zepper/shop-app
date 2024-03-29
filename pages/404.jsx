import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Error() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  });
  return null;
}
