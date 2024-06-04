import React from 'react'
import "./stepperPage.scss"
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, List, ListItem, MenuItem, Radio, RadioGroup, Select, Stack, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const StepperPage = () => {
    const steps = ['Chose Plan', 'Fill Details',];
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const handleReset = () => {
        setActiveStep(0);
    };

    const [maritalStatus, setMaritalStatus] = React.useState('');
    const handleMaritalStatusChange = (event) => {
        setMaritalStatus(event.target.value);
    };

    const [dependents, setDependents] = React.useState('');
    const handleDependentsChange = (event) => {
        setDependents(event.target.value);
    };
    
    const [annualIncome, setAnnualIncome] = React.useState('');
    const handleAnnualIncomeChange = (event) => {
        setAnnualIncome(event.target.value);
    };
    return (
        <Box className='common_box'>
            {/* <Box className="stepOne">
                stepOne
            </Box>
            <Box className="stepTwo">
                stepTwo
            </Box>
            <Box className="stepperBtn_wrap">
                <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                    <Button variant="contained" className='stepperBtn'><ArrowBackIosIcon /> Prev</Button>
                    <Button variant="contained" className='stepperBtn'>Next <ArrowForwardIosIcon /></Button>
                </Stack>
            </Box> */}
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
                        {/* <Box sx={{ flex: '1 1 auto' }} /> */}
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
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"

                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="Life" />
                                        <FormControlLabel value="male" control={<Radio />} label="Disability" />
                                    </RadioGroup>
                                </FormControl>

                                <Typography variant='h3'>
                                    Plan Benefits
                                </Typography>

                                <List sx={{ listStyle: "decimal", padding: "0 0 0 20px" }}>
                                    <ListItem sx={{ display: "list-item" }}>
                                        <b>Life Insurance Benefits</b> : In the event of the insured person's death, life insurance benefits are paid out to the designated beneficiaries. This can provide financial support to the family or dependents left behind.
                                    </ListItem>
                                    <ListItem sx={{ display: "list-item" }}>
                                        <b>Disability Insurance Benefits</b> : Disability insurance provides income replacement if you become unable to work    due to illness or injury. Benefits can be short-term or long-term depending on the policy.
                                    </ListItem>
                                </List>
                            </Box>
                            :
                            <Box className="stepTwo stepBox">
                                <Box className="user_form">
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} sm={6}>
                                            <Box className="form_group">
                                                <TextField label="Agency Name" variant="outlined" fullWidth InputLabelProps={{ style: { fontSize: 16 } }} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box className="form_group">
                                                <TextField label="Agency Zip Code" variant="outlined" fullWidth InputLabelProps={{ style: { fontSize: 16 } }} />
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Typography variant='h3'>Client Information</Typography>
                                            <Box className="form_group">
                                                <TextField label="Full Name" variant="outlined" fullWidth InputLabelProps={{ style: { fontSize: 16 } }} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant='h3' display={{xs: 'none', sm:"block" }} >&nbsp;</Typography>
                                            <Box className="form_group date_picker">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={['DatePicker']}>
                                                        <DatePicker label="Date of Birth" />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box className="form_group">
                                                <TextField label="Phone" variant="outlined" fullWidth InputLabelProps={{ style: { fontSize: 16 } }} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box className="form_group">
                                                <TextField label="Email" variant="outlined" fullWidth InputLabelProps={{ style: { fontSize: 16 } }} />
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
                                                        onChange={handleMaritalStatusChange}
                                                    >
                                                        <MenuItem value={1}>Single </MenuItem>
                                                        <MenuItem value={2}>Married </MenuItem>
                                                        <MenuItem value={3}>Married </MenuItem>
                                                        <MenuItem value={4}>Widowed</MenuItem>
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
                                                        onChange={handleDependentsChange}
                                                    >
                                                        <MenuItem value={1}>0 </MenuItem>
                                                        <MenuItem value={2}>1 </MenuItem>
                                                        <MenuItem value={3}>2 </MenuItem>
                                                        <MenuItem value={4}>3</MenuItem>
                                                        <MenuItem value={5}>4+</MenuItem>
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
                                                        onChange={handleAnnualIncomeChange}
                                                    >
                                                        <MenuItem value={1}>Under $25,000</MenuItem>
                                                        <MenuItem value={2}>$25,000 - $50,000</MenuItem>
                                                        <MenuItem value={3}>$50,000 - $90,000</MenuItem>
                                                        <MenuItem value={4}>$90,000+</MenuItem>
                                                       
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>

                            </Box>
                    }
                    {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1} test</Typography> */}
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
                        <Button variant="contained" onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    )
}

export default StepperPage