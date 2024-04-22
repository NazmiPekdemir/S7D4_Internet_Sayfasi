import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const initalValues = {
  adSoyad: "",
  email: "",
  password: "",
};

export const errorsMassage = {
  adSoyad: "En az 3 karakter giriniz",
  email: "Geçerli bir email adresi giriniz",
  password: "En az 8 karakter, B K harf içermeli, sembol içermelidir",
};

export default function Register() {
  const [id, setId] = useState("");

  const [formData, setFormData] = useState(initalValues);

  const [errors, setErrors] = useState({
    adSoyad: false,
    email: false,
    password: false,
  });

  const [isValid, setIsValid] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  useEffect(() => {
    if (
      formData.adSoyad.trim().length >= 3 &&
      validateEmail(formData.email) &&
      regex.test(formData.password)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name == "adSoyad") {
      if (value.trim().length >= 3) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    if (name == "email") {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    if (name == "password") {
      if (regex.test(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;

    axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => {
        setId(res.data.id);
        setFormData(initalValues);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <div>
      <Card>
        <CardHeader>Kayıt Ol</CardHeader>
        <img alt="Avatar" src="https://picsum.photos/300/200?" />
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="adSoyad">Adınız Soyadınız</Label>
              <Input
                id="adSoyad"
                name="adSoyad"
                placeholder="Adınız Soyadınız"
                type="text"
                onChange={handleChange}
                value={formData.adSoyad}
                invalid={errors.adSoyad}
                data-cy="adSoyad-input"
              />
              {errors.adSoyad && (
                <FormFeedback data-cy="error-message">
                  {errorsMassage.adSoyad}
                </FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Email adresinizi girin"
                type="email"
                onChange={handleChange}
                value={formData.email}
                invalid={errors.email}
                data-cy="email-input"
              />
              {errors.email && (
                <FormFeedback data-cy="error-message">
                  {errorsMassage.email}
                </FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="password">Şifreniz</Label>
              <Input
                id="password"
                name="password"
                placeholder="Şifreniz"
                type="password"
                onChange={handleChange}
                value={formData.password}
                invalid={errors.password}
                data-cy="password-input"
              />
              {errors.password && (
                <FormFeedback data-cy="error-message">
                  {errorsMassage.password}
                </FormFeedback>
              )}
            </FormGroup>

            <Button disabled={!isValid} data-cy="submit-input">
              Kayıt Ol
            </Button>
          </Form>
          {id && <CardFooter data-cy="id-varmi">Kullanıcı ID: {id}</CardFooter>}
        </CardBody>
      </Card>
    </div>
  );
}
