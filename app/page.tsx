"use client"

import SignIn from "@/components/auth/SignIn";
// import SignUp2 from "@/components/auth/SignUp2";
import SignUp from "@/components/auth/SignUp";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDialogContext } from "@/lib/context/DialogContext";
// import { IsLoginDialogActiveAtom } from "@/lib/store/atoms";
// import { useRecoilState } from "recoil";

export default function Home() {
  // const [isLoginDialogActive, setIsLoginDialogActive] = useRecoilState(IsLoginDialogActiveAtom)
  const {isLoginDialogActive} = useDialogContext();
  return (
    // <div>
    //   <div>
    //     <Dialog>
    //       <DialogTrigger>
    //         <Button
    //           variant="outline"
    //           className="text-lg px-8 py-4 bg-[#26890d] hover:bg-[#1f750b] text-white"
    //         >
    //           Sign Up
    //         </Button>
    //       </DialogTrigger>
    //       <DialogContent className="flex flex-col bg-[#131313] text-white rounded-xl border-0 shadow-none">
    //         <SignUp />
    //       </DialogContent>
    //     </Dialog>
    //   </div>
    //   <div>
    //     <Dialog>
    //       <DialogTrigger asChild>
    //         <Button
    //           variant="outline"
    //           className="text-lg px-8 py-4 bg-[#26890d] hover:bg-[#1f750b] text-white"
    //         >
    //           Sign In
    //         </Button>
    //       </DialogTrigger>
    //       <DialogContent className="flex flex-col bg-[#131313] text-white rounded-xl border-0 shadow-none">
    //         <SignIn />
    //       </DialogContent>
    //     </Dialog>
    //   </div>
    // </div>
    <div>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"} className="text-lg px-8py-4 bg-[#26890d] hover:bg-[#1f750b] text-white">
              Auth
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col bg-[#131313] text-white rounded-xl border-0 shadow-none">
            {isLoginDialogActive ? <SignIn /> : <SignUp />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
