import axios from 'axios';

const imageUrl = 'https://fierce-shore-33740.herokuapp.com/https://infomall-001-site1.etempurl.com/api/Files/upload';


export const upload = (fileList) => {
    const file = fileList[0];
        let fileupload = new FormData()
        fileupload.append('file', file)
        return axios
        .post(imageUrl, fileupload)
            .then(url => {
                return url;

            }).catch(err => { throw new Error(err.response.data) });
        }

