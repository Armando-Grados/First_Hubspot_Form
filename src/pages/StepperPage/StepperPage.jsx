import React from 'react';
import "./stepperPage.scss";
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CashValueLife from '../../icons/CashValueLife';
import Life from '../../icons/Life';
import Disability from '../../icons/Disability';

const StepperPage = () => {
    const steps = ['Choose Plan', 'Fill Details'];
    const [activeStep, setActiveStep] = React.useState(0);

    const [chosePlan, setChosePlan] = React.useState("");
    const [agencyName, setAgencyName] = React.useState("");
    const [agencyZipCode, setAgencyZipCode] = React.useState("");
    const [fullName, setFullName] = React.useState("");
    const [dateOfBirth, setDateOfBirth] = React.useState(null);
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [maritalStatus, setMaritalStatus] = React.useState("");
    const [dependents, setDependents] = React.useState("");
    const [annualIncome, setAnnualIncome] = React.useState("");

    const [errors, setErrors] = React.useState({});

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validatePhone = (phone) => {
        return /^\d{10}$/.test(phone);
    };

    const validateFields = () => {
        let tempErrors = {};
        if (!chosePlan) tempErrors.chosePlan = "Please choose a plan.";
        if (!agencyName) tempErrors.agencyName = "Agency Name is required.";
        if (!agencyZipCode) tempErrors.agencyZipCode = "Agency Zip Code is required.";
        if (!fullName) tempErrors.fullName = "Full Name is required.";
        if (!dateOfBirth) tempErrors.dateOfBirth = "Date of Birth is required.";
        if (!phone) tempErrors.phone = "Phone number is required.";
        else if (!validatePhone(phone)) tempErrors.phone = "Phone number is not valid.";
        if (!email) tempErrors.email = "Email is required.";
        else if (!validateEmail(email)) tempErrors.email = "Email is not valid.";
        if (!maritalStatus) tempErrors.maritalStatus = "Marital Status is required.";
        if (!dependents) tempErrors.dependents = "Dependents field is required.";
        if (!annualIncome) tempErrors.annualIncome = "Annual Income is required.";

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    const handleNext = () => {
        if (activeStep === 0 && !chosePlan) {
            setErrors({ chosePlan: "Please choose a plan." });
            return;
        }
        if (activeStep === 1 && !validateFields()) {
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleSubmit = () => {
        if (!validateFields()) {
            return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        var data = {
            "fields": [
                {
                    "name": "choose_plan",
                    "value": chosePlan
                },
                {
                    "name": "agency_name",
                    "value": agencyName
                },
                {
                    "name": "agency_zip_code",
                    "value": agencyZipCode
                },
                {
                    "name": "full_name",
                    "value": fullName
                },
                {
                    "name": "date_of_birth",
                    "value": dateOfBirth
                },
                {
                    "name": "phone",
                    "value": phone
                },
                {
                    "name": "email",
                    "value": email
                },
                {
                    "name": "maritalstatus",
                    "value": maritalStatus
                },
                {
                    "name": "dependents",
                    "value": dependents
                },
                {
                    "name": "annual_income",
                    "value": annualIncome
                },
            ],
        }

        axios({
            method: 'post',
            url: `https://api.hsforms.com/submissions/v3/integration/submit/${'43592916'}/${'49715623-b50f-444b-b38e-61df1191ffb0'}`,
            data: JSON.stringify(data), // you are sending body instead
            headers: {
                'Content-Type': 'application/json'
            },
        })
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box className='common_box'>
            <Typography variant='h2' className='main_title'>Insurance Made Simple</Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1, pt: 4, fontWeight: 600, fontSize: 22 }} textAlign={'center'}>
                        Form submitted successfully.
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pt: 2 }}>
                        <Button variant="contained" onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {activeStep === 0 ?
                        <Box className="stepOne stepBox">
                            <Typography variant='h2' sx={{ marginBottom: "30px" }}>Choose Plan</Typography>
                            <FormControl className='choosePlan' error={!!errors.chosePlan}>
                                <RadioGroup
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    onChange={(e) => { setChosePlan(e.target.value); setErrors({ ...errors, chosePlan: "" }); }}
                                >
                                    <FormControlLabel value="Cash Value Life" control={<Radio />} label={<><CashValueLife /> Cash Value Life</>} />
                                    <FormControlLabel value="Life Insurance Benefits" control={<Radio />} label={<><Life /> Life</>} />
                                    <FormControlLabel value="Disability Insurance Benefits" control={<Radio />} label={<><Disability /> Disability</>} />
                                </RadioGroup>
                                {errors.chosePlan && <Typography color="error">{errors.chosePlan}</Typography>}
                            </FormControl>
                        </Box>
                        :
                        <Box className="stepTwo stepBox">
                            <Box className="user_form">
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={6}>
                                        <Box className="form_group">
                                            <TextField
                                                label="Agency Name"
                                                variant="outlined"
                                                fullWidth
                                                InputLabelProps={{ style: { fontSize: 16 } }}
                                                onChange={(e) => { setAgencyName(e.target.value); setErrors({ ...errors, agencyName: "" }); }}
                                                error={!!errors.agencyName}
                                                helperText={errors.agencyName}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box className="form_group">
                                            <TextField
                                                label="Agency Zip Code"
                                                variant="outlined"
                                                fullWidth
                                                InputLabelProps={{ style: { fontSize: 16 } }}
                                                onChange={(e) => { setAgencyZipCode(e.target.value); setErrors({ ...errors, agencyZipCode: "" }); }}
                                                error={!!errors.agencyZipCode}
                                                helperText={errors.agencyZipCode}
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Typography variant='h3'>Client Information</Typography>
                                        <Box className="form_group">
                                            <TextField
                                                label="Full Name"
                                                variant="outlined"
                                                fullWidth
                                                InputLabelProps={{ style: { fontSize: 16 } }}
                                                onChange={(e) => { setFullName(e.target.value); setErrors({ ...errors, fullName: "" }); }}
                                                error={!!errors.fullName}
                                                helperText={errors.fullName}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant='h3' display={{ xs: 'none', sm: "block" }}>&nbsp;</Typography>
                                        <Box className="form_group date_picker">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']}>
                                                    <DatePicker
                                                        label="Date of Birth"
                                                        value={dateOfBirth}
                                                        onChange={(newValue) => { setDateOfBirth(newValue); setErrors({ ...errors, dateOfBirth: "" }); }}
                                                        slotProps={{ 
                                                            textField: { 
                                                                sx: { 
                                                                    width: '100%',
                                                                    '& .MuiOutlinedInput-root': {
                                                                        '& fieldset': {
                                                                            borderColor: errors.dateOfBirth ? 'red' : 'default'
                                                                        },
                                                                        '&:hover fieldset': {
                                                                            borderColor: errors.dateOfBirth ? 'red' : 'default'
                                                                        },
                                                                        '&.Mui-focused fieldset': {
                                                                            borderColor: errors.dateOfBirth ? 'red' : 'default'
                                                                        }
                                                                    }
                                                                }, 
                                                                error: !!errors.dateOfBirth, 
                                                                helperText: errors.dateOfBirth
                                                            }
                                                        }}
                                                        // renderInput={(params) => (
                                                        //     <TextField {...params} error={!!errors.dateOfBirth} helperText={errors.dateOfBirth} />
                                                        // )}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box className="form_group">
                                            <TextField
                                                label="Phone"
                                                variant="outlined"
                                                fullWidth
                                                InputLabelProps={{ style: { fontSize: 16 } }}
                                                onChange={(e) => { setPhone(e.target.value); setErrors({ ...errors, phone: "" }); }}
                                                error={!!errors.phone}
                                                helperText={errors.phone}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box className="form_group">
                                            <TextField
                                                label="Email"
                                                variant="outlined"
                                                fullWidth
                                                InputLabelProps={{ style: { fontSize: 16 } }}
                                                onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: "" }); }}
                                                error={!!errors.email}
                                                helperText={errors.email}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box className="form_group">
                                            <FormControl fullWidth error={!!errors.maritalStatus}>
                                                <InputLabel id="demo-simple-select-label">Marital Status</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={maritalStatus}
                                                    label="maritalStatus"
                                                    onChange={(e) => { setMaritalStatus(e.target.value); setErrors({ ...errors, maritalStatus: "" }); }}
                                                >
                                                    <MenuItem value="Single">Single</MenuItem>
                                                    <MenuItem value="Married">Married</MenuItem>
                                                    <MenuItem value="Divorced">Divorced</MenuItem>
                                                    <MenuItem value="Widowed">Widowed</MenuItem>
                                                </Select>
                                                {errors.maritalStatus && <Typography className='Mui-error' color="error">{errors.maritalStatus}</Typography>}
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box className="form_group">
                                            <FormControl fullWidth error={!!errors.dependents}>
                                                <InputLabel id="demo-simple-select-label">Dependents</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={dependents}
                                                    label="Dependents"
                                                    onChange={(e) => { setDependents(e.target.value); setErrors({ ...errors, dependents: "" }); }}
                                                >
                                                    <MenuItem value="1">1</MenuItem>
                                                    <MenuItem value="2">2</MenuItem>
                                                    <MenuItem value="3">3</MenuItem>
                                                    <MenuItem value="4">4</MenuItem>
                                                    <MenuItem value="4+">4+</MenuItem>
                                                </Select>
                                                {errors.dependents && <Typography className='Mui-error' color="error">{errors.dependents}</Typography>}
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box className="form_group">
                                            <FormControl fullWidth error={!!errors.annualIncome}>
                                                <InputLabel id="demo-simple-select-label">Annual Income</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={annualIncome}
                                                    label="AnnualIncome"
                                                    onChange={(e) => { setAnnualIncome(e.target.value); setErrors({ ...errors, annualIncome: "" }); }}
                                                >
                                                    <MenuItem value="Under $25000">Under $25,000</MenuItem>
                                                    <MenuItem value="$25000 - $50000">$25,000 - $50,000</MenuItem>
                                                    <MenuItem value="$50000 - $90000">$50,000 - $90,000</MenuItem>
                                                    <MenuItem value="$90000+">$90,000+</MenuItem>
                                                </Select>
                                                {errors.annualIncome && <Typography className='Mui-error' color="error">{errors.annualIncome}</Typography>}
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    }
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
                        <Button
                            variant="contained"
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1, display: activeStep === 0 ? 'none' : 'block' }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {activeStep === steps.length - 1 ?
                            <Button variant="contained" onClick={handleSubmit}>
                                Submit
                            </Button>
                            :
                            <Button variant="contained" onClick={handleNext}>
                                Next
                            </Button>
                        }
                    </Box>
                </React.Fragment>
            )}
        </Box>
    )
}

export default StepperPage
