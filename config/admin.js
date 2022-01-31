module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '14d3a670a82274d7d32e5e576babcfca'),
  },
});
