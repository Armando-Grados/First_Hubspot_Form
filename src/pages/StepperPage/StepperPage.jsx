import React from 'react'
import "./stepperPage.scss"
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CashValueLife from '../../icons/CashValueLife';
import Life from '../../icons/Life';
import Disability from '../../icons/Disability';


const StepperPage = () => {
    const steps = ['Chose Plan', 'Fill Details',];
    const [activeStep, setActiveStep] = React.useState(0);

    const [chosePlan, setChosePlan] = React.useState("");
    const [agencyName, setAgencyName] = React.useState("");
    const [agencyZipCode, setAgencyZipCode] = React.useState("");
    const [fullName, setFullName] = React.useState("");
    const [dateOfBirth, setDateOfBirth] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [maritalStatus, setMaritalStatus] = React.useState("");
    const [dependents, setDependents] = React.useState("");
    const [annualIncome, setAnnualIncome] = React.useState("");

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleSubmit = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        var data = {
            "fields": [
                {
                    // "objectTypeId": "0-1",
                    "name": "choose_plan",
                    "value": chosePlan
                },
                {
                    // "objectTypeId": "0-1",
                    "name": "agency_name",
                    "value": agencyName
                },
                {
                    // "objectTypeId": "0-1",
                    "name": "agency_zip_code",
                    "value": agencyZipCode
                },
                {
                    // "objectTypeId": "0-1",
                    "name": "full_name",
                    "value": fullName
                },
                {
                    // "objectTypeId": "0-1",
                    "name": "date_of_birth",
                    "value": dateOfBirth
                },
                {
                    // "objectTypeId": "0-1",
                    "name": "phone",
                    "value": phone
                },
                {
                    // "objectTypeId": "0-1",
                    "name": "email",
                    "value": email
                },
                {
                    // "objectTypeId": "0-1",
                    "name": "maritalstatus",
                    "value": maritalStatus
                },
                {
                    // "objectTypeId": "0-1",
                    "name": "dependents",
                    "value": dependents
                },
                {
                    // "objectTypeId": "0-1",
                    "name": "annual_income",
                    "value": annualIncome
                },
            ],
        }

        axios({
            method: 'post',
            // url: `https://api.hsforms.com/submissions/v3/integration/submit/${'46389118'}/${'c4d959db-295f-455d-b6d1-4e7fd4329555'}`,
            url: `https://api.hsforms.com/submissions/v3/integration/submit/${'43592916'}/${'49715623-b50f-444b-b38e-61df1191ffb0'}`,
            data: JSON.stringify(data), // you are sending body instead
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const handleReset = () => {
        setActiveStep(0);
    };

    // const [maritalStatus, setMaritalStatus] = React.useState('');
    // const handleMaritalStatusChange = (event) => {
    //     setMaritalStatus(event.target.value);
    // };

    // const [dependents, setDependents] = React.useState('');
    // const handleDependentsChange = (event) => {
    //     setDependents(event.target.value);
    // };

    // const [annualIncome, setAnnualIncome] = React.useState('');
    // const handleAnnualIncomeChange = (event) => {
    //     setAnnualIncome(event.target.value);
    // };
    return (
        <Box className='common_box'>
            <Typography variant='h2' className='main_title'>Insurance Made Simple</Typography>
            <Stepper activeStep={activeStep} alternativeLabel >
                {steps.map((label) => {
                    const stepProps = {};
                    const labelProps = {};

                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
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
                    {
                        activeStep === 0 ?
                            <Box className="stepOne stepBox">
                                
                                <Typography variant='h2'>Chose Plan</Typography>
                                <FormControl className='choosePlan'>
                                    <RadioGroup
                                        // row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        onChange={(e) => { setChosePlan(e.target.value) }}
                                    >
                                        <FormControlLabel value="Cash Value Life" control={<Radio />} label={ <><CashValueLife /> Cash Value Life</> } />
                                        <FormControlLabel value="Life Insurance Benefits" control={<Radio />} label={<><Life/> Life</>} />
                                        <FormControlLabel value="Disability Insurance Benefits" control={<Radio />} label={<><Disability/> Disability</>} />
                                    </RadioGroup>
                                </FormControl>

                                {/* <Typography variant='h3'>
                                    Plan Benefits
                                </Typography>
                                <List sx={{ listStyle: "decimal", padding: "0 0 0 20px" }}>
                                    <ListItem sx={{ display: "list-item" }}>
                                        <b>Life Insurance Benefits</b> : In the event of the insured person's death, life insurance benefits are paid out to the designated beneficiaries. This can provide financial support to the family or dependents left behind.
                                    </ListItem>
                                    <ListItem sx={{ display: "list-item" }}>
                                        <b>Disability Insurance Benefits</b> : Disability insurance provides income replacement if you become unable to work    due to illness or injury. Benefits can be short-term or long-term depending on the policy.
                                    </ListItem>
                                </List> */}
                            </Box>
                            :
                            <Box className="stepTwo stepBox">
                                <Box className="user_form">
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} sm={6}>
                                            <Box className="form_group">
                                                <TextField label="Agency Name" variant="outlined" fullWidth InputLabelProps={{ style: { fontSize: 16 } }}
                                                    onChange={(e) => { setAgencyName(e.target.value) }} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box className="form_group">
                                                <TextField label="Agency Zip Code" variant="outlined" fullWidth InputLabelProps={{ style: { fontSize: 16 } }}
                                                    onChange={(e) => { setAgencyZipCode(e.target.value) }} />
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Typography variant='h3'>Client Information</Typography>
                                            <Box className="form_group">
                                                <TextField label="Full Name" variant="outlined" fullWidth InputLabelProps={{ style: { fontSize: 16 } }}
                                                    onChange={(e) => { setFullName(e.target.value) }} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant='h3' display={{ xs: 'none', sm: "block" }} >&nbsp;</Typography>
                                            <Box className="form_group date_picker">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={['DatePicker']}>
                                                        <DatePicker label="Date of Birth" onChange={(newValue) => { setDateOfBirth(newValue) }} />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box className="form_group">
                                                <TextField label="Phone" variant="outlined" fullWidth InputLabelProps={{ style: { fontSize: 16 } }}
                                                    onChange={(e) => { setPhone(e.target.value) }} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box className="form_group">
                                                <TextField label="Email" variant="outlined" fullWidth InputLabelProps={{ style: { fontSize: 16 } }}
                                                    onChange={(e) => { setEmail(e.target.value) }} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box className="form_group">
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Marital Status</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={maritalStatus}
                                                        label="maritalStatus"
                                                        onChange={(e) => { setMaritalStatus(e.target.value) }}
                                                    >
                                                        <MenuItem value="Single" >Single</MenuItem>
                                                        <MenuItem value="Married" >Married</MenuItem>
                                                        <MenuItem value="Divorced" >Divorced</MenuItem>
                                                        <MenuItem value="Widowed">Widowed</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box className="form_group">
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Dependents</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={dependents}
                                                        label="Dependents"
                                                        onChange={(e) => { setDependents(e.target.value) }}
                                                    >
                                                        <MenuItem value="1">1</MenuItem>
                                                        <MenuItem value="2">2</MenuItem>
                                                        <MenuItem value="3">3</MenuItem>
                                                        <MenuItem value="4">4</MenuItem>
                                                        <MenuItem value="4+">4+</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box className="form_group">
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Annual Income</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={annualIncome}
                                                        label="AnnualIncome"
                                                        onChange={(e) => { setAnnualIncome(e.target.value) }}
                                                    >
                                                        <MenuItem value="Under $25000">Under $25,000</MenuItem>
                                                        <MenuItem value="$25000 - $50000">$25,000 - $50,000</MenuItem>
                                                        <MenuItem value="$50000 - $90000">$50,000 - $90,000</MenuItem>
                                                        <MenuItem value="$90000+">$90,000+</MenuItem>

                                                    </Select>
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