
import React, {  useState, ChangeEvent, useEffect } from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import { SigninUIFormElement, SigninUIProps } from './AuthProp';


const SigninUI = ({
  username = "",
  password = "",
  scope = "",
  onSubmit,
  persistent = false,
  showScope = false,
  scopeLabel = "Account",
  showPersistent = false,
}: SigninUIProps) => {

  // const reg = new Tretareg();
  // const regex = reg.start().username().end().build(3,16);
  // console.log(regex.test("test"));

  
  // console.log(endp.Endpoint());

  const [props, setProps] = useState<SigninUIProps>({
    username,
    password,
    onSubmit,
    persistent,
    regexPassword: null,
    regexUsername: null,
    regexScope: null,
    scope,
    showScope,
    showPersistent,
    scopeLabel
  });

  useEffect(() => {
    setProps({
      ...props,
      username: username,
      password: password,
      persistent: persistent,
      showScope: showScope,
      showPersistent,
      scopeLabel: scopeLabel,
      scope: scope
    });
  }, [username, password, persistent, showScope, showPersistent, scopeLabel, scope]);

  const handleSubmit = (event: React.FormEvent<SigninUIFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const data = {
      email: formElements.username.value,
      password: formElements.password.value,
      persistent: formElements.persistent.checked,
    };

    if (!data.email || !data.password) {
      return;
    }

    onSubmit(data.email, data.password);
  };

  function handleSwitchPersistent(event: React.ChangeEvent<HTMLInputElement>) {
    setProps({ ...props, persistent: event.target.checked });
  }

  function handleUsernameBlur(event: React.FocusEvent<HTMLInputElement>): void {

  }

  function handlePasswordBlur(event: React.FocusEvent<HTMLInputElement>): void {

  }

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProps({ ...props, username: e.target.value });
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProps({ ...props, password: e.target.value });
  }

  function handleScopeChange(e: ChangeEvent<HTMLInputElement>): void {
    setProps({ ...props, scope: e.target.value });
  }

  return (
    <CssVarsProvider defaultMode="light" disableTransitionOnChange>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          my: 'auto',
          py: 2,
          pb: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: 400,
          maxWidth: '100%',
          mx: 'auto',
          borderRadius: 'sm',
          '& form': {
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          },
          [`& .${formLabelClasses.asterisk}`]: {
            visibility: 'hidden',
          },
        }}
      >
        <Stack gap={4} sx={{ mt: 2 }}>
          <form onSubmit={handleSubmit}>
            <FormControl required>
              <FormLabel>Username</FormLabel>
              <Input
                onChange={handleUsernameChange}
                value={props.username}
                name="username" type="text"
                autoComplete="off"
                onBlur={handleUsernameBlur} />
            </FormControl>
            {props.showScope && (
              <FormControl>
                <FormLabel>{props.scopeLabel}</FormLabel>
                <Input
                  value={props.scope}
                  onChange={handleScopeChange}
                  name="scope"
                  type="text"
                  autoComplete="off"
                />
              </FormControl>
            )}
            <FormControl required>
              <FormLabel>Password</FormLabel>
              <Input
                value={props.password}
                onChange={handlePasswordChange}
                name="password" type="password" autoComplete="off" onBlur={handlePasswordBlur} />
            </FormControl>
            {props.showPersistent && (
            <FormControl>
              <Checkbox onChange={handleSwitchPersistent} checked={props.persistent} name="persistent" />
              <FormLabel>Persistent</FormLabel>
            </FormControl>)}
            <Button type="submit">Submit</Button>
          </form>
        </Stack>
      </Box>
    </CssVarsProvider>
  );
}

export default SigninUI;