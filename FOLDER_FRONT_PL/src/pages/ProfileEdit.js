import { Button, Card, CardHeader, CardMedia, CardContent, TextField, Grid, Box, Typography } from '@mui/material';
import React, { useRef, useState, useEffect, Component } from 'react'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ButtonCustom from '../components/ButtonCustom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import axios from 'axios';
import Header from './Header'
import postService from '../services/post-service';
import authService from '../services/auth-service';
import userService from '../services/user-service';

export default class ProfileEdit extends Component {
    constructor(props) {
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);

        this.state = {
            currentUser: authService.getCurrentUser(),
            currentProfile: userService.getCurrentProfile(),
            namexD: "",
            lastname: "",
            description: "",
            message: "",
            updated: false

        }

    }


    componentDidMount() {

        this.setState({
            namexD: this.state.currentProfile.name,
            lastname: this.state.currentProfile.lastname,
            description: this.state.currentProfile.description
        });

    }

    onChangeName(e) {
        this.setState({
            namexD: e.target.value
        });
    }
    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleUpdate(e) {
        e.preventDefault();
        userService.update(
            this.state.currentProfile.userId,
            this.state.namexD,
            this.state.lastname,
            this.state.description
        ).then(
            response => {
                this.setState({
                    message: response.data.message
                });
                userService.login().then(
                    () => {
                        this.setState({
                            updated: true
                        });
                    },
                    error => {
                        const resMessage = (
                            error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
                        this.setState({
                            message: resMessage
                        });
                    });
            },
            error => {
                console.log(error);
                const resMessage = (
                    error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.setState({
                    message: resMessage
                });
            }
        );
    }

    render() {
        return (
            <>
                <Header />
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item xs={3}>
                        {!this.state.updated && (
                            <Card style={{ width: '614px', marginTop: '20px' }} elevation={5}>

                                <CardHeader
                                    title="Edytuj profil"
                                />
                                <CardContent>
                                    <form onSubmit={this.handleUpdate}>

                                        <input
                                            aria-label="Wpisz swoje imi�"
                                            type="text"
                                            placeholder="Name"
                                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                                            onChange={this.onChangeName}
                                            //defaultValue={this.state.currentProfile.name}
                                            value={this.state.namexD}
                                        />

                                        <input
                                            aria-label="Wpisz swoje nazwisko"
                                            type="text"
                                            placeholder="Lastname"
                                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                                            onChange={this.onChangeLastname}
                                            //defaultValue={this.state.currentProfile.lastname}
                                            value={this.state.lastname}
                                        />

                                        <input
                                            aria-label="Wprowad� opis o sobie"
                                            type="text"
                                            placeholder="Description"
                                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                                            onChange={this.onChangeDescription}
                                            //defaultValue={this.state.currentProfile.description}
                                            value={this.state.description}
                                        />
                                        <button
                                            type="submit"
                                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold`}
                                        >
                                            Aktualizuj profil
                                        </button>
                                    </form>
                                </CardContent>
                            </Card>
                        )}

                        {this.state.updated && (
                            <Card style={{ width: '614px', marginTop: '20px' }} elevation={5}>
                                <CardHeader
                                    title="Profil zaktualizowano"
                                />
                                <CardContent>

                                    <ButtonCustom link="/Profile" name="Profil" icon={<AccountBoxOutlinedIcon />} />

                            </CardContent>
                        </Card>
                        )}
                </Grid>
            </Grid>
            </>
        );
    }

}
