import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/APIResponse.js";

const generateTokens = async (userId) => {
    try {

        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave : false}); //to skip the password validation by

        return {accessToken , refreshToken};
        
    } catch (error) {
        throw new APIError(500 , "Somehting went wrong with tokens")
    }
}

const registerUser = asyncHandler(async (req, res) => {
  // console.log(req.files);

  const { fullName, email, password, username } = req.body;

  if (
    [fullName, email, password, username].some((feild) => feild.trim() === "")
  ) {
    throw new APIError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ $or: [{ email }, { username }] }); //used to find if user exits or not

  if (existedUser) {
    throw new APIError(409, "user already exists");
  }

  //multer provides acces to req.files

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  

  if (!avatarLocalPath) {
    throw new APIError(400, "Avatar is required");
  }

  // let coverImageLocalPath;
  // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
  //     coverImageLocalPath = req.files.coverImage[0].path
  // }

  //uplaodng files to cloduinary

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new APIError(400, "Avatar is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" //thses feild gets rejected
  );

  if (!createdUser) {
    throw new APIError(500, "Something went worng");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "userCreated Succesfully"));
});

const loginUser = asyncHandler(async(req , res) =>{

    //req body -> data
    //validate the falsy inputs
    //check if user exits
    //cheeck if password is correct or not
    //generate token and send it to user(cokkie)\


    const {email , username , password} = req.body;

    if(!email && !username){
        throw new APIError(400 , "Email or username is required");

    }

    const user = await User.findOne({$or : [{email} , {username}]})

    if(!user){
        throw new APIError(404 , "user doest exiist")
    }
    
    const isPasswordValid = await user.isPasswordCorrect(password)
    
    if(!isPasswordValid){
        throw new APIError(404 , "Incorrect Password")
    }

    const {accessToken , refreshToken} = await generateTokens(user._id)

    const loggedInUser = User.findById(user._id).select("-password -refreshToken")

    const options  = {
      httpOnly : true,
      secure : true
    }

    return res.status(200).cookie("accessToken" , accessToken , options).cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
          200, 
          {
              user: loggedInUser, accessToken, refreshToken
          },
          "User logged In Successfully"
      ))

})

const logoutUser = asyncHandler(async(req, res) => {
  await User.findByIdAndUpdate(
      req.user._id,
      {
          $unset: {
              refreshToken: 1 // this removes the field from document
          }
      },
      {
          new: true
      }
  )

  const options = {
      httpOnly: true,
      secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponse(200, {}, "User logged Out"))
})

export { registerUser , loginUser , logoutUser };
