const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Tạo liên hệ
exports.create = async (req, res, next) => {
    if (!req.body.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.status(201).json(document);
    } catch (error) {
        return next(error);
    }
};

// Lấy tất cả liên hệ
exports.findAll = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.find({});
        return res.json(documents);
    } catch (error) {
        return next(error);
    }
};

// Lấy liên hệ theo ID
exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);

        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }

        return res.json(document);
    } catch (error) {
        return next(error);
    }
};

// Cập nhật liên hệ
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);

        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }

        return res.json({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(error);
    }
};

// Xóa một liên hệ
exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);

        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }

        return res.json({ message: "Contact was deleted successfully" });
    } catch (error) {
        return next(error);
    }
};

// Lấy liên hệ yêu thích
exports.findAllFavorite = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.json(documents);
    } catch (error) {
        return next(error);
    }
};

// Xóa tất cả liên hệ
exports.deleteAll = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteAll();

        return res.json({
            message: `${deletedCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(error);
    }
};