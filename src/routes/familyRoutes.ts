import {
  createFamilyMember,
  deleteFamilyMember,
  getAllFamilyMembers,
  getFamilyMemberId,
  updateFamilyMember,
} from '../controllers/familyController.js';
import { Router } from 'express';

const router = Router();

// get All families
router.get('/', getAllFamilyMembers);

// get family member
router.get('/:id', getFamilyMemberId);

// create family member
router.post('/', createFamilyMember);

// update family member
router.put('/:id', updateFamilyMember);

//
router.delete('/:id', deleteFamilyMember);

export default router;
