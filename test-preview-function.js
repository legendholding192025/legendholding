// Test function for resume preview - Run this in browser console
// Usage: testResumePreview('your-resume-url-here')

async function testResumePreview(resumeUrl) {
    console.log('🔍 Testing resume preview for URL:', resumeUrl);
    
    // Initialize Supabase client (assumes it's available globally)
    const supabase = window.supabase || createClientComponentClient();
    
    try {
        let previewUrl;
        let shouldCleanupUrl = false;

        if (resumeUrl.startsWith('data:')) {
            console.log('✅ Detected BASE64 file');
            previewUrl = resumeUrl;
        } else if (resumeUrl.startsWith('http')) {
            console.log('✅ Detected FULL URL');
            previewUrl = resumeUrl;
        } else {
            console.log('🔧 Processing storage path:', resumeUrl);
            
            let filePath = resumeUrl;
            if (filePath.startsWith('/')) {
                filePath = filePath.substring(1);
                console.log('📁 Cleaned path:', filePath);
            }
            
            // Test Strategy 1: Public URL
            console.log('🌐 Testing public URL from resumes bucket...');
            try {
                const { data: publicUrlData } = supabase.storage
                    .from('resumes')
                    .getPublicUrl(filePath);
                
                if (publicUrlData?.publicUrl) {
                    console.log('✅ Public URL generated:', publicUrlData.publicUrl);
                    previewUrl = publicUrlData.publicUrl;
                } else {
                    throw new Error('No public URL generated');
                }
            } catch (publicUrlError) {
                console.log('❌ Public URL failed:', publicUrlError.message);
                
                // Test Strategy 2: Storage download
                console.log('💾 Testing storage download...');
                try {
                    const { data, error } = await supabase.storage
                        .from('applications')
                        .download(filePath);

                    if (error) {
                        console.log('❌ Applications bucket failed:', error.message);
                        
                        // Try resumes bucket
                        console.log('🔄 Trying resumes bucket...');
                        const { data: altData, error: altError } = await supabase.storage
                            .from('resumes')
                            .download(filePath);
                        
                        if (altError) {
                            console.log('❌ Resumes bucket also failed:', altError.message);
                            throw new Error(`File not found in any bucket: ${filePath}`);
                        }
                        
                        console.log('✅ Downloaded from resumes bucket');
                        previewUrl = URL.createObjectURL(altData);
                        shouldCleanupUrl = true;
                    } else {
                        console.log('✅ Downloaded from applications bucket');
                        previewUrl = URL.createObjectURL(data);
                        shouldCleanupUrl = true;
                    }
                } catch (storageError) {
                    console.log('❌ Storage download failed:', storageError.message);
                    throw new Error('Unable to access resume file');
                }
            }
        }

        console.log('🚀 Final preview URL:', previewUrl);
        
        // Test opening the URL
        const newWindow = window.open(previewUrl, '_blank');
        
        if (newWindow) {
            console.log('✅ Successfully opened preview window');
            if (shouldCleanupUrl) {
                setTimeout(() => {
                    URL.revokeObjectURL(previewUrl);
                    console.log('🧹 Cleaned up blob URL');
                }, 5000);
            }
        } else {
            console.log('❌ Failed to open window - check pop-up blocker');
            if (shouldCleanupUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        }
        
        return previewUrl;
        
    } catch (error) {
        console.error('💥 Preview test failed:', error.message);
        throw error;
    }
}

// Test bucket access
async function testBucketAccess() {
    console.log('🔍 Testing bucket access...');
    
    const supabase = window.supabase || createClientComponentClient();
    
    try {
        // Test resumes bucket
        console.log('📁 Testing resumes bucket...');
        const { data: resumesList, error: resumesError } = await supabase.storage
            .from('resumes')
            .list('', { limit: 1 });
        
        if (resumesError) {
            console.log('❌ Resumes bucket error:', resumesError.message);
        } else {
            console.log('✅ Resumes bucket accessible:', resumesList);
        }
        
        // Test applications bucket
        console.log('📁 Testing applications bucket...');
        const { data: appsList, error: appsError } = await supabase.storage
            .from('applications')
            .list('', { limit: 1 });
        
        if (appsError) {
            console.log('❌ Applications bucket error:', appsError.message);
        } else {
            console.log('✅ Applications bucket accessible:', appsList);
        }
        
    } catch (error) {
        console.error('💥 Bucket access test failed:', error.message);
    }
}

console.log('🛠️  Resume preview test functions loaded!');
console.log('📋 Available functions:');
console.log('   - testResumePreview("your-resume-url")');
console.log('   - testBucketAccess()');
console.log('');
console.log('📖 Usage example:');
console.log('   testResumePreview("1234567890/resume.pdf")'); 