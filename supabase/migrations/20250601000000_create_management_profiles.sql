-- Management profiles for digital business cards (QR code landing pages).
-- Super admin manages via /admin/management-profiles.
CREATE TABLE IF NOT EXISTS management_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT 'Legend Holding Group',
  photo TEXT NOT NULL,
  email TEXT DEFAULT '',
  whatsapp TEXT DEFAULT '',
  linkedin TEXT DEFAULT '',
  website TEXT DEFAULT '',
  location TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_management_profiles_slug ON management_profiles(slug);
CREATE INDEX IF NOT EXISTS idx_management_profiles_sort ON management_profiles(sort_order);

-- Allow public read for profile pages
ALTER TABLE management_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read management profiles"
  ON management_profiles FOR SELECT
  USING (true);

-- Only authenticated admins can insert/update/delete (enforced in app via API)
CREATE POLICY "Admins can manage management profiles"
  ON management_profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role IN ('super_admin', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role IN ('super_admin', 'admin')
    )
  );

-- Seed with existing profiles (optional - run once)
INSERT INTO management_profiles (slug, name, designation, company, photo, email, whatsapp, linkedin, sort_order)
VALUES
  ('kai-zheng', 'Kai Zheng', 'Founder & Chairman', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770205702/KAI_u2nbdv.png', 'kai@legendholding.com', '971504837940', 'https://www.linkedin.com/in/kai-zheng-96087698/', 1),
  ('mira-wu', 'Mira Wu', 'Co-Founder & Vice Chairman', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770108401/%D9%84%D8%A7%D9%89_nqk2ki.png', 'mira.wu@legendholding.com', '971566501676', 'https://www.linkedin.com/in/mira-wu-7497001b2/', 2),
  ('cannon-wang', 'Cannon Wang', 'VP Dealership & Strategy of LHG', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770205702/3_k6nv6n.png', 'cannon.wang@legendmotorsuae.com', '971501451556', 'https://www.linkedin.com/in/cannon-wang-55649b118/', 3),
  ('jonathan-stretton', 'Jonathan Stretton', 'Chief Operating Officer', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770205701/4_jqudjk.png', 'jonathan.stretton@legendholding.com', '97156881623', 'https://www.linkedin.com/in/jonathan-stretton-aa370a48/', 4),
  ('nagaraj-ponnada', 'Nagaraj Ponnada', 'General Manager', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770205702/2_p7whcx.png', 'nagaraj.p@legendmotorsuae.com', '971506720814', 'https://www.linkedin.com/in/nagarajforgrowth/', 5),
  ('rejeesh-raveendran', 'Rejeesh Raveendran', 'Group Finance Director', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770205701/1_twihoy.png', 'rejeesh.pillai@legendholding.com', '971564802082', 'https://www.linkedin.com/in/rejeesh-r-pillai-820b4423b/', 6),
  ('waseem-khalayleh', 'Waseem Khalayleh', 'Head of Brand', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1770205703/5_ohvtkk.png', 'waseem.k@legendholding.com', '971549964549', 'https://www.linkedin.com/in/waseem-khalayleh-96b8a780/', 7)
ON CONFLICT (slug) DO NOTHING;
