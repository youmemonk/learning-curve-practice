require(Modules.AI);

let outboundNumber = 919834682054;
let inboundNumber;


VoxEngine.addEventListener(AppEvents.Started, (e) => {
  //  let number = VoxEngine.customData() // we assume that a callee's number arrives as customData in e.164 format

  call = VoxEngine.callPSTN(outboundNumber, inboundNumber); 
  createParticipant();

  call.addEventListener(CallEvents.Connected, onCallConnected);
  call.addEventListener(CallEvents.Disconnected, function () {
    conversation.stop();
    VoxEngine.terminate();
  });

  call.addEventListener(CallEvents.Failed, VoxEngine.terminate);
});

//! When the call gets Connected
function onCallConnected(ev) {
  isCallConnected = true;
  agent = new CCAI.Agent(agentId, region);
  agent.addEventListener(CCAI.Events.Agent.Started, () => {
    conversation = new CCAI.Conversation({
      agent,
      profile: { name: profile },
      project: appName,
    });
    conversation.addEventListener(CCAI.Events.Conversation.Created, () => {
      isConversationCreated = true;
      createParticipant();
    });
  });
}
