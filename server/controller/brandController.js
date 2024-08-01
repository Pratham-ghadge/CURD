import brands from "../model/brandModel.js";
 
// get all brand data from databse

export const getAll = async (req, res) => {
  try {
    const brandData = await brands.find();
    if (!brandData) {
      return res.status(404).json({ msg: "Brand Data Not Found" });
    }
    res.status(200).json(brandData);
  } catch (error) {
    res.status(500).json({ error });
  }
};

//get one brand data from databse

export const getone = async (req, res) => {
  try {
    const id = req.params.id;
    const brandExist = await brands.findById(id);

    if (!brandExist) {
      return res.status(404).json({ msg: "Brand Data Not Found" });
    }
    res.status(200).json(brandExist);
  } catch (error) {
    res.status(500).json({ error });
  }
};

//update brand data 
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const brandExist = await brands.findById(id);

    if (!brandExist) {
      return res.status(401).json({ msg: "Brand Data Not Found" });
    }

    if (req.file) {
      brandExist.logo = req.file.filename;
    }

    brandExist.name = req.body.name;
    brandExist.url = req.body.url;

    const updatedData = await brandExist.save();
    res.status(200).json({ msg: "Updated successfully", data: updatedData });
  } catch (error) {
    console.error("Error updating brand: ", error);
    res.status(500).json({ error: "Failed to update brand" });
  }
};

//delete brand data

export const deletebrand = async (req, res) => {
  try {
    const id = req.params.id;
    const brandExist = await brands.findById(id);

    if (!brandExist) {
      return res.status(401).json({ msg: "Brand Data Not Found" });
    }
    await brands.findByIdAndDelete(id);
    res.status(200).json({ msg: "Brand Delete successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// upload image to databse
export const upload = async (req, res) => {
  try {
    const { id } = req.body;
    const brandExist = await brands.findById(id);

    if (!brandExist) {
      return res.status(404).json({ msg: "Brand not found" });
    }

    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    brandExist.logo = req.file.filename;

    await brandExist.save();

    res
      .status(200)
      .json({ msg: "File uploaded successfully", brand: brandExist });
  } catch (error) {
    console.error("Error uploading file: ", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};

// create a new brand

export const create = async (req, res) => {
  try {
    const { name, url } = req.body;
    const logo = req.file.filename;
    const newBrand = new brands({ name, url, logo });
    const savedBrand = await newBrand.save();
    res.status(201).json({ msg: "Brand added successfully", data: savedBrand });
  } catch (error) {
    console.error("Error creating brand: ", error);
    res.status(500).json({ error: "Failed to create brand" });
  }
};



