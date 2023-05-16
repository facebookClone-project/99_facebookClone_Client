import { useState } from "react";
import useInput from "./useInput";

const BoardMakerModal = ({ setShowBoardModal, showBoardModal }) => {
    const default_profile_url = "/images/default-profile-url.png";
    const closeIcon = "/images/close.png";
    const imageAddIcon = "/images/imageAddIcon.png";

    // post text 작성
    const [post, postChangeHandler] = useInput("");
    // console.log(post);
    const [button, setButton] = useState(false);

    //모달창 닫기
    const closeButtonHandler = () => {
        setShowBoardModal(!showBoardModal);
        if (post.length > 0) {
            setButton(!button);
        }
    };

    // 이미지 파일 상태 관리
    const [file, setFile] = useState(null);
    console.log(file);
    // 이미지 미리보기 파일 관리
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    // console.log(imagePreviewUrl);

    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let selectedFile = e.target.files[0];

        reader.onloadend = () => {
            setFile(selectedFile);
            setImagePreviewUrl(reader.result);
        };

        if (selectedFile) {
            reader.readAsDataURL(selectedFile); // 올린 사진 파일 읽기
        }
    };

    return (
        <div class="h-screen w-screen top-0 left-0 right-0 bottom-0 fixed bg-gray-200 bg-opacity-50 z-10">
            <div class="bg-white h-[600px] w-[580px] relative top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 max-w-600 min-w-300 rounded-lg shadow-2xl">
                <div>
                    <div class="border-b-2 pb-4 relative text-[20px] font-semibold">게시물 만들기</div>

                    <div
                        class="h-10 w-10 rounded-full bg-gray-200  hover:bg-gray-300 absolute right-3 top-3 flex items-center justify-center"
                        role="button"
                        onClick={closeButtonHandler}
                    >
                        <img class="h-7 w-7 " src={closeIcon} alt="" />
                    </div>
                    <div class="flex flex-row space-x-2 mt-3">
                        <img class="h-9 w-9 flex-none rounded-full self-center" src={default_profile_url} alt="" />
                        <div class="text-left">유리</div>
                    </div>
                    <form
                        method="post"
                        encType="multipart/form-data"
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <textarea
                            rows={3}
                            class="bg-transparent resize-none w-[550px] mt-2 outline-none "
                            value={post}
                            onChange={postChangeHandler}
                        />
                    </form>
                    {/* <div class="bg-green-200 w-[550px] h-[300px] rounded-lg"></div> */}

                    <div class="max-w-xl">
                        <div class=" p-2 bg-white border-solid border-2 border-gray-300 rounded-lg">
                            {/* 👇 imagePreviewUrl 값이 존재한다면 그 이미지를 보여주고 아니라면 사진/동영상 추가화면출력 */}
                            {imagePreviewUrl ? (
                                <div class="flex justify-center items-center overflow-hidden h-[300px]">
                                    <img src={imagePreviewUrl} alt="preview" />
                                </div>
                            ) : (
                                <label class="flex justify-center w-full h-[300px] px-4 transition bg-gray-50  rounded-md appearance-none cursor-pointer hover:bg-gray-200 focus:outline-none">
                                    <span class="flex flex-col justify-center items-center space-x-2\">
                                        <div class="bg-gray-300 rounded-full hover:bg-gray-500">
                                            <img class="w-9 h-9 " src={imageAddIcon} alt="" />
                                        </div>
                                        <span class="font-medium text-gray-600 flex items-center text-[20px]">
                                            사진/동영상 추가
                                        </span>
                                        <span class="text-[14px] text-gray-500">또는 끌어서 놓습니다.</span>
                                    </span>
                                    <input
                                        type="file"
                                        name="file_upload"
                                        class="hidden"
                                        onChange={(e) => handleImageChange(e)}
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                    <div class="bg-[#1b6dd8] text-white rounded-lg w-[550px] p-2 text-center  mt-5" role="button">
                        게시
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardMakerModal;
