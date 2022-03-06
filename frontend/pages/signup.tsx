import React from "react";
import { Typography, Grid, TextField, Box, FormControl, Button, Card, FormHelperText } from "@mui/material";
import { Formik } from "formik";

import styles from "../styles/Signup.module.css";
import Navbar from "../components/navbar";
import schema from "../schema/signupSchema";

const Signup = () => {
  return(
    <React.Fragment>
      <Navbar />

      <div className={styles.signupBackground}>
        <Formik 
          validationSchema={schema}
          enableReintialize={true}
          initialValues={{name: '', email: '', password: '', mobileNumber: ''}}
          onSubmit={()=> {

          }}
        >
          {(formikProps) => (
            <Grid
              container
              component="main"
              maxWidth="xs"
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{minHeight: '93.2vh'}}
            >
              <Card variant="outlined" className={styles.signupCard}>
                <Typography className={styles.heading}>Welcome</Typography>
                <Typography className={styles.subHeading}>Get started and publish exam in less than 5 minutes.</Typography>
                <Box marginTop={2}>
                  <FormControl fullWidth margin="dense">
                    <TextField
                      variant="outlined"
                      label="Name"
                      name="name"
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      error={formikProps.touched.name && !!formikProps.errors.name}
                      value={formikProps.values.name}
                    />
                    <FormHelperText className={styles.errorText}>{formikProps.errors.name && formikProps.touched.name ? formikProps.errors.name : null}</FormHelperText>
                  </FormControl>
                  <FormControl fullWidth margin="dense">
                    <TextField
                      variant="outlined" 
                      label="Email"
                      name="email"
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      error={formikProps.touched.email && !!formikProps.errors.email}
                      value={formikProps.values.email}
                    />
                    <FormHelperText className={styles.errorText}>{formikProps.errors.email && formikProps.touched.email ? formikProps.errors.email : null}</FormHelperText>
                  </FormControl>
                  <FormControl fullWidth margin="dense">
                    <TextField
                      variant="outlined"
                      label="Mobile number"
                      name="mobileNumber"
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      error={formikProps.touched.mobileNumber && !!formikProps.errors.mobileNumber}
                      value={formikProps.values.mobileNumber}
                    />
                    <FormHelperText className={styles.errorText}>{formikProps.errors.mobileNumber && formikProps.touched.mobileNumber ? formikProps.errors.mobileNumber : null}</FormHelperText>
                  </FormControl>
                  <FormControl fullWidth margin="dense">
                    <TextField
                      variant="outlined"
                      label="Password"
                      name="password"
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      value={formikProps.values.password}
                      error={formikProps.touched.password && !!formikProps.errors.password}
                      type="password"
                    />
                    <FormHelperText className={styles.errorText}>{formikProps.errors.password && formikProps.touched.password ? formikProps.errors.password : null}</FormHelperText>
                  </FormControl>
                  <Button variant="contained" onClick={()=> formikProps.handleSubmit()} className={styles.submitButton}>Request</Button>
                </Box>
              </Card>
            </Grid>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default Signup;