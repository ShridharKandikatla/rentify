const { PrismaClient } = require('@prisma/client');
const { sendEmail } = require('../services/emailService');

const prisma = new PrismaClient();

const postProperty = async (req, res) => {
  const { location, area, bedrooms, bathrooms, amenities } = req.body;
  if (!location || !area || !bedrooms || !bathrooms || !amenities) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const property = await prisma.property.create({
      data: {
        location,
        area,
        bedrooms,
        bathrooms,
        amenities,
        user: { connect: { id: req.user.userId } },
      },
    });
    res.json(property);
  } catch (e) {
    res.status(400).json({ error: 'Error creating property' });
  }
};

const viewProperties = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const skip = (page - 1) * pageSize;
  const properties = await prisma.property.findMany({
    skip: parseInt(skip),
    take: parseInt(pageSize),
  });
  res.json(properties);
};

const viewPropertyDetails = async (req, res) => {
  const propertyId = parseInt(req.params.id);
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
    include: { user: true },
  });
  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }
  res.json(property);
};

const likeProperty = async (req, res) => {
  const propertyId = parseInt(req.params.id);
  const property = await prisma.property.update({
    where: { id: propertyId },
    data: {
      likes: { increment: 1 },
    },
  });
  res.json(property);
};

const interestedInProperty = async (req, res) => {
  const propertyId = parseInt(req.params.id);
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
    include: { user: true },
  });
  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }

  const buyer = await prisma.user.findUnique({
    where: { id: req.user.userId },
  });

  // Send email to buyer with seller's details
  sendEmail(
    buyer.email,
    'Interested in Property',
    `You showed interest in the property located at ${property.location}. Contact details of the seller: ${property.user.email}`
  );

  // Send email to seller with buyer's details
  sendEmail(
    property.user.email,
    'Buyer Interested in Your Property',
    `A buyer is interested in your property located at ${property.location}. Buyer's contact details: ${buyer.email}`
  );

  res.json({ message: 'Interest shown and emails sent' });
};

module.exports = {
  postProperty,
  viewProperties,
  viewPropertyDetails,
  likeProperty,
  interestedInProperty,
};
