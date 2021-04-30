import axios_instance from '../axios_instance.js';

function getUserPlatformInfo(isSignedIn, platform){
	if (isSignedIn)
	{
		return (
			axios_instance({
				method: 'post',
				url: "profile/play",
				data: {
					platformId:platform,
				}
			})
		);
	}
	else
	{
		return (new Promise((resolve, reject) => {
			resolve({data: {
					completeId:[],
					ownPlatform:false,
					score: 0,
					modulesCompleted: 0,
					badges: [false, false, false, false],
				}})
		}));
	}
}

export default getUserPlatformInfo;
