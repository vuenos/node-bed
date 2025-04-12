import FamilyMember from '../models/FamilyMember.js';
// GET all families
export const getAllFamilyMembers = async (req, res) => {
    try {
        const familyMembers = await FamilyMember.find().sort({ createdAt: -1 });
        res.status(200).json(familyMembers);
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: '가족 구성원 조회 중 오류가 발생했습니다',
            error: err.message,
        });
    }
};
// GET family member
export const getFamilyMemberId = async (req, res) => {
    try {
        const familyMember = await FamilyMember.findById(req.params.id);
        if (!familyMember) {
            res.status(404).json({ message: '해당 가족 구성원을 찾을 수 없습니다' });
            return;
        }
        res.status(200).json(familyMember);
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: '가족 구성원 조회 중 오류가 발생했습니다',
            error: err.message,
        });
    }
};
// CREATE family member
export const createFamilyMember = async (req, res) => {
    try {
        const newFamilyMember = new FamilyMember(req.body);
        await newFamilyMember.save();
        res.status(201).json(newFamilyMember);
    }
    catch (error) {
        const err = error;
        if (err.name === 'ValidationError') {
            res
                .status(400)
                .json({ message: '입력 데이터 검증 실패', err: err.message });
            return;
        }
        res.status(500).json({
            message: '가족 구성원 추가 중 오류가 발생했습니다',
            error: err.message,
        });
    }
};
// UPDATE family member
export const updateFamilyMember = async (req, res) => {
    try {
        const updatedFamilyMember = await FamilyMember.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedFamilyMember) {
            res.status(404).json({ message: '해당 가족 구성원을 찾을 수 없습니다' });
            return;
        }
        res.status(200).json(updatedFamilyMember);
    }
    catch (error) {
        const err = error;
        if (err.name === 'ValidationError') {
            res
                .status(400)
                .json({ message: '입력 데이터 검증 실패', err: err.message });
            return;
        }
        res.status(500).json({
            message: '가족 구성원 정보 수정 중 오류가 발생했습니다',
            error: err.message,
        });
    }
};
// DELETE family member
export const deleteFamilyMember = async (req, res) => {
    try {
        const deletedFamilyMember = await FamilyMember.findByIdAndDelete(req.params.id);
        if (!deletedFamilyMember) {
            res.status(404).json({ message: '해당 가족 구성원을 찾을 수 없습니다' });
            return;
        }
        res.status(200).json({ message: '가족 구성원이 성공적으로 삭제되었습니다' });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: '가족 구성원 삭제 중 오류가 발생했습니다',
            error: err.message,
        });
    }
};
