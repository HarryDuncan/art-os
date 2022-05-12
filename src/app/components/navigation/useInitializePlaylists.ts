// import {
//   InitializeAudioNodeResponse,
//   InitializeAudioNodeRequest,
//   PlaylistRequest,
// } from "./grpc/protos/audioNode_pb";
// import { AudioNodeServiceClient } from "./grpc";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";

// export const usePlaylistNavigation = () => {
//   const audioNode = new AudioNodeServiceClient(
//     "http://localhost:8000/audioNode"
//   );

//   useEffect(() => {
//     const init = new InitializeAudioNodeRequest();
//     audioNode.initializeAudioNode(init, {}, (err, response) => {
//       if (err) {
//         throw "Error Could Not Connect To Audio Node";
//       } else {
//         // gets the playlists
//         const playlists: string[] = response.array[1];
//         setUpPlaylists(playlists);

//         playlists.forEach((playlist: string, index: number) => {
//           const getTracks = new PlaylistRequest();
//           getTracks.setPlaylistname(playlist);
//           audioNode.sendPlaylists(getTracks, {}, (err, response) => {
//             setUpPlaylistItems(response.array[0], index);
//           });
//         });
//       }
//     });
//     // const getPlaylists = new
//   }, []);
// };

export const useInitializePlaylist = () => {};
