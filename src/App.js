import logo from './logo.svg';
import './App.css';
import { checkAndSignAuthMessage, LitNodeClient } from '@lit-protocol/lit-node-client';

const litActionCode = `
const go = async () => {  
  const sigShare = await Lit.Actions.signEcdsa({ toSign, publicKey , sigName });
};
go();
`;

async function helper() {
  const litNodeClient = new LitNodeClient({ litNetwork: 'cayenne', debug: true});
  await litNodeClient.connect();

  const nonce = litNodeClient.getLatestBlockhash();
  console.log(nonce);
  const authSig = await checkAndSignAuthMessage({ chain: 'ethereum', nonce });
  console.log(authSig);

  // const signatures = await litNodeClient.executeJs({
  //   code: litActionCode,
  //   authSig,
  //   // all jsParams can be used anywhere in your litActionCode
  //   jsParams: {
  //     // this is the string "Hello World" for testing
  //     toSign: [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100],
  //     publicKey:
  //       "043b6cebc29d5f2e437f27b25675a22eb240257415815b8dacc0585b7f8c4d8686e9ad83484b1289756b186042388dfdee19f44c5d82173915289f0765510576ad",
  //     sigName: "sig1",
  //   },
  // });
  // console.log("signatures: ", signatures);
}


function App() {
  return (
    <div className="App">
      <button onClick={helper}>App</button>
    </div>
  );
}

export default App;
