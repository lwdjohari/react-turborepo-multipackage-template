/**
 * Props for the AuthUI component.
 */
export interface SigninUIProps {
   /**
    * The username for authentication.
    */
   username: string;
   /**
    * The password for authentication.
    */
   password: string;
   /**
    * The scope for authentication.
    */
   scope: string;
 
   /**
    * Show the scope text input element
    */
   showScope: boolean;
   scopeLabel: string;
 
   showPersistent: boolean;
 
   /**
    * Determines if the authentication should persist.
    */
   persistent: boolean;
   /**
    * Callback function to handle form submission.
    * @param username - The username entered in the form.
    * @param password - The password entered in the form.
    */
   onSubmit: (username: string, password: string) => void | null;
   /**
    * Regular expression for validating the username.
    */
   regexUsername: string | null;
   /**
    * Regular expression for validating the password.
    */
   regexPassword: string | null;
 
   /**
      * Regular expression for validating the password.
      */
   regexScope: string | null;
 }
 
 
 export interface SigninFormElements extends HTMLFormControlsCollection {
   username: HTMLInputElement;
   password: HTMLInputElement;
   scope: HTMLInputElement;
   persistent: HTMLInputElement;
 }
 
 export interface SigninUIFormElement extends HTMLFormElement {
   readonly elements: SigninFormElements;
 }