"use client"


import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SignInForm } from "../../forms/signin/SigninForm"
import { SignupForm } from "../../forms/signup-form"
import styles from "./styles.module.css"

export const AuthDialog = () => {
  const [showSignup, setShowSignup] = useState(false);

  const handleToggle = () => {
    console.log('toggle');
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" onClick={handleToggle}>Sign in</Button>
      </DialogTrigger>
      <DialogContent className="w-[800px] p-2 flex flex-col justify-center items-stretch gap-5 text-center">
        <DialogTitle>{showSignup ? "Sign Up" : "Sign in"}</DialogTitle>
        {showSignup ? <SignupForm /> : <SignInForm />}
        <DialogFooter className="sm:justify-center">
          <Button 
            onClick={() => setShowSignup(!showSignup)}
            variant="link"
            className={styles.highlight}
          >
            {showSignup ? "Already a member? Sign in" : "Not a member? Sign Up"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
