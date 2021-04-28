import axios_instance from '../axios_instance.js';

function getUserPlatformInfo(username, isSignedIn, platform){
	if (isSignedIn)
	{
		return (
			axios_instance({
				method: 'post',
				url: "profile/play",
				data: {
					username:username,
					platformId:platform,
				}
			}).catch( () => {
				return axios_instance({
					method: 'post',
					url: "profile/stats",
					data: {
						platformId:platform,
					}
				}).then( () => {
					return axios_instance({
						method: 'post',
						url: "profile/play",
						data: {
							username:username,
							platformId:platform,
						}
					});
				})
			})
		);
	}
	else
	{
		return (new Promise((resolve, reject) => {
			resolve({data: {
					completeId:[],
					ownPlatform:false
				}})
		}));
	}
}

export default getUserPlatformInfo;
