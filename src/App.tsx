import * as React from "react";

import logo from './logo.svg';
import {v4 as uuid} from 'uuid';

import {Button, Card, Elevation, H5} from "@blueprintjs/core";

import GenericDialog from './GenericDialog'
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/index.html
// import individual service
// import S3 from 'aws-sdk/clients/s3';
// To use the TypeScript definition files within a Node.js project, simply import aws-sdk as you normally would.
import {chimeApi} from "./api/ChimeApi";

import './App.css';

function App() {

    const [loading, setLoading] = React.useState(false);
    const [showDialog, setShowDialog] = React.useState(false);
    const [apiResponse, setApiResponse] = React.useState<any>({})

    /**
     * https://aws.github.io/amazon-chime-sdk-js/modules/gettingstarted.html
     */
    async function createMeeting() {
        const params = {
            title: `${uuid()}`,
            name: `${uuid()}`,
            region: `us-east-1`
        };
        setLoading(true)
        const meetingResponse = await chimeApi.createMeeting(`title=${params.title}&name=${params.name}&region=${params.region}`);
        setLoading(false)
        setApiResponse(meetingResponse);
        setShowDialog(true);
    }


    return (
        <div className="App m-4">
            <Card interactive={false} elevation={Elevation.ZERO}>
                <img src={logo} className="App-logo inline" alt="logo"/>
                <H5>Chime Demo</H5>
                <Button onClick={createMeeting} loading={loading} disabled={loading}>Create Meeting</Button>
                <GenericDialog isOpen={showDialog}>
                    <p style={{
                        marginBottom: '10px',
                        marginTop: 0,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all'
                    }}>{JSON.stringify(apiResponse, null, 3)}</p>
                </GenericDialog>
            </Card>
        </div>
    );
}

export default App;
