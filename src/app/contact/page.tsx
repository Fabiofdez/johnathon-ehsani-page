"use client";

import { useForm } from "@formspree/react";
import { IconMailCheck, IconSend } from "@tabler/icons-react";
import clsx from "clsx";
import {
  ChangeEvent,
  ElementType,
  FormEvent,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

type FormRefType = InputFieldType | HTMLButtonElement;
type InputFieldType = HTMLInputElement & HTMLTextAreaElement;
type InputFieldProps = InputHTMLAttributes<InputFieldType> & {
  label?: string;
  textArea?: boolean;
};

const FORM_KEY = "mkonbvae";

const Contact = () => {
  const formRefs = useRef<{ [k: string]: FormRefType }>({});
  const [state, handleSubmit] = useForm(FORM_KEY);
  const SUBMIT_ID = "btn-submit-form";

  useEffect(() => {
    if (state.submitting || state.succeeded) {
      Object.values(formRefs.current).forEach((input) => {
        input.setCustomValidity("");
      });

      return;
    }

    const formErrors = state.errors?.getFormErrors();
    const fieldErrors = state.errors?.getAllFieldErrors();

    const firstFormError = formErrors?.[0]?.message;
    if (firstFormError) {
      const btn = formRefs.current[SUBMIT_ID];

      btn?.setCustomValidity(firstFormError);
      btn?.reportValidity();
    }

    if (!fieldErrors?.length) return;
    const [firstField, firstFieldErrors] = fieldErrors?.[0];

    const firstFieldError = firstFieldErrors?.[0]?.message;
    if (firstFieldError) {
      const input = formRefs.current[firstField];

      input?.setCustomValidity(firstFieldError);
      input?.reportValidity();
    }
  }, [state]);

  function addInputRef(input: FormRefType | null) {
    if (!input?.id) return;
    formRefs.current[input.id] = input;
  }

  function checkInputValidity({
    currentTarget: input,
  }: ChangeEvent<InputFieldType>) {
    if (!input?.id) return;

    if (input.validity.customError) input.setCustomValidity("");
  }

  return (
    <section className="contact">
      <form onSubmit={handleSubmit} inert={state.succeeded}>
        <h2 className="with-sep centered">Get In Touch</h2>

        <div className="input-row">
          <InputField
            id="name"
            name="Name"
            label="Name"
            autoComplete="name"
            placeholder="John Smith"
            onChange={checkInputValidity}
            required
            ref={addInputRef}
          />
          <InputField
            id="email"
            type="email"
            name="Email"
            label="Email"
            autoComplete="email"
            placeholder="john.smith@domain.com"
            onChange={checkInputValidity}
            required
            ref={addInputRef}
          />
        </div>

        <InputField
          textArea
          className="min-h-[5rem]"
          id="message"
          name="Message"
          label="Message"
          placeholder="Share your thoughts here..."
          onChange={checkInputValidity}
          required
          ref={addInputRef}
        />

        <button
          className="primary mx-auto mt-[1rem]"
          id={SUBMIT_ID}
          type="submit"
          disabled={state.submitting}
          ref={addInputRef}
        >
          Send Message
          <IconSend />
        </button>
      </form>

      <div className="success-overlay" inert={!state.succeeded}>
        <h2 className="text-[3rem]! font-bold">Thank You!</h2>

        <p className="subtitle -translate-y-[0.5rem] md:mb-[0.5rem]">
          Your message has been received, I'll get back to you soon.
        </p>

        <IconMailCheck className="success" />

        <a className="main-cta mt-[2rem]!" href="/">
          Home
        </a>
      </div>
    </section>
  );
};

const InputField = forwardRef<InputFieldType, InputFieldProps>((props, ref) => {
  const { className, label, textArea, ...inputProps } = props;
  const Input: ElementType = textArea ? "textarea" : "input";

  const [valid, setValid] = useState(true);

  function renderValidity(event: FormEvent<InputFieldType>) {
    const input = event.currentTarget;
    setValid(input.validity.valid);
  }

  return (
    <div className="input-field">
      <label htmlFor={props.id} hidden={!label}>
        {label}
        {props.required ? <b className="star">*</b> : null}
      </label>

      <Input
        {...inputProps}
        className={clsx(className, !valid && "error")}
        // onInvalid={renderValidity}
        // onInput={renderValidity}
        ref={ref}
      />
    </div>
  );
});

export default Contact;
